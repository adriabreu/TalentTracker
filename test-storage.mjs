#!/usr/bin/env node

/**
 * Script de teste para verificar o sistema de armazenamento
 * 
 * Uso:
 * - node test-storage.mjs memory    # Testa MemStorage
 * - node test-storage.mjs database  # Testa DbStorage
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storageType = process.argv[2] || 'memory';

if (!['memory', 'database'].includes(storageType)) {
  console.error('❌ Tipo de armazenamento inválido. Use "memory" ou "database"');
  process.exit(1);
}

console.log(`🧪 Testando armazenamento: ${storageType.toUpperCase()}`);
console.log('');

// Configurar variável de ambiente
const env = { ...process.env };
if (storageType === 'database') {
  env.USE_DATABASE = 'true';
  if (!env.DATABASE_URL) {
    console.error('❌ DATABASE_URL não configurada para teste de banco de dados');
    console.log('Configure a variável DATABASE_URL no seu arquivo .env');
    process.exit(1);
  }
} else {
  env.USE_DATABASE = 'false';
}

// Iniciar servidor
const server = spawn('node', ['dist/index.js'], {
  env,
  stdio: ['pipe', 'pipe', 'pipe']
});

let serverReady = false;
let healthCheckPassed = false;

// Capturar logs do servidor
server.stdout.on('data', (data) => {
  const output = data.toString();
  console.log(`📝 Servidor: ${output.trim()}`);
  
  if (output.includes('Server running on port')) {
    serverReady = true;
    console.log('✅ Servidor iniciado com sucesso');
    
    // Aguardar um pouco e fazer health check
    setTimeout(() => {
      testHealthCheck();
    }, 2000);
  }
});

server.stderr.on('data', (data) => {
  const output = data.toString();
  console.log(`⚠️  Erro: ${output.trim()}`);
});

// Função para testar health check
async function testHealthCheck() {
  try {
    console.log('🔍 Testando endpoint de health check...');
    
    const response = await fetch('http://localhost:3000/health');
    const data = await response.json();
    
    console.log('📊 Resposta do health check:', data);
    
    if (data.status === 'ok') {
      const expectedStorage = storageType === 'database' ? 'postgresql' : 'memory';
      if (data.storage === expectedStorage) {
        console.log(`✅ Health check passou! Armazenamento: ${data.storage}`);
        healthCheckPassed = true;
      } else {
        console.log(`❌ Health check falhou! Esperado: ${expectedStorage}, Recebido: ${data.storage}`);
      }
    } else {
      console.log('❌ Health check falhou! Status não é "ok"');
    }
    
    // Testar algumas rotas básicas
    await testBasicRoutes();
    
  } catch (error) {
    console.log('❌ Erro ao fazer health check:', error.message);
  } finally {
    // Parar servidor
    server.kill();
  }
}

// Função para testar rotas básicas
async function testBasicRoutes() {
  try {
    console.log('🔍 Testando rotas básicas...');
    
    // Testar rota de usuários
    const usersResponse = await fetch('http://localhost:3000/api/users');
    if (usersResponse.ok) {
      const users = await usersResponse.json();
      console.log(`✅ Rota /api/users funcionando! ${users.length} usuários encontrados`);
    } else {
      console.log('❌ Rota /api/users falhou');
    }
    
    // Testar rota de clientes
    const clientsResponse = await fetch('http://localhost:3000/api/clients');
    if (clientsResponse.ok) {
      const clients = await clientsResponse.json();
      console.log(`✅ Rota /api/clients funcionando! ${clients.length} clientes encontrados`);
    } else {
      console.log('❌ Rota /api/clients falhou');
    }
    
  } catch (error) {
    console.log('❌ Erro ao testar rotas básicas:', error.message);
  }
}

// Capturar saída do servidor
server.on('close', (code) => {
  console.log('');
  console.log('📋 Resumo do teste:');
  console.log(`   Tipo de armazenamento: ${storageType}`);
  console.log(`   Servidor iniciou: ${serverReady ? '✅' : '❌'}`);
  console.log(`   Health check passou: ${healthCheckPassed ? '✅' : '❌'}`);
  
  if (serverReady && healthCheckPassed) {
    console.log('');
    console.log('🎉 Teste concluído com sucesso!');
    console.log(`O sistema está funcionando corretamente com armazenamento ${storageType}`);
  } else {
    console.log('');
    console.log('💥 Teste falhou! Verifique os logs acima para mais detalhes.');
    process.exit(1);
  }
});

// Tratamento de erros
server.on('error', (error) => {
  console.error('❌ Erro ao iniciar servidor:', error);
  process.exit(1);
});

// Timeout de segurança
setTimeout(() => {
  if (!serverReady) {
    console.log('⏰ Timeout: Servidor não iniciou em 10 segundos');
    server.kill();
    process.exit(1);
  }
}, 10000);

// Capturar Ctrl+C
process.on('SIGINT', () => {
  console.log('\n🛑 Interrompendo teste...');
  server.kill();
  process.exit(0);
}); 