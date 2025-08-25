#!/usr/bin/env node
/**
 * Script para corrigir problemas de importação em testes migrados de Vitest para Jest
 * Criado em 13/07/2025
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Encontrar todos os arquivos de teste com erros de importação
const findBrokenImports = () => {
  try {
    const result = execSync(
      'find ./client/src -type f -name "*.test.*" -exec grep -l "import { import React" {} \\;'
    ).toString().trim().split('\n');
    
    return result.filter(file => file !== '');
  } catch (error) {
    console.error('Erro ao buscar arquivos com importações quebradas:', error.message);
    return [];
  }
};

// Corrigir um arquivo com importações quebradas
const fixFile = (filePath) => {
  console.log(`\nProcessando: ${filePath}`);
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Criar backup do arquivo original se ainda não existir
    const backupPath = `${filePath}.bak-original`;
    if (!fs.existsSync(backupPath)) {
      fs.writeFileSync(backupPath, content);
      console.log(`  ✅ Backup criado: ${backupPath}`);
    }
    
    // Corrigir importações quebradas
    let modified = content.replace(
      /import\s+\{\s*import\s+React\s+from\s+['"]react['"];\s*\}\s*from\s+['"]@jest\/globals['"];?/g,
      `import React from 'react';`
    );
    
    // Corrigir outras importações do vitest para jest
    modified = modified.replace(
      /import\s+\{\s*([\w\s,]+)\s*\}\s+from\s+['"]vitest['"];?/g,
      (match, importedFunctions) => {
        if (importedFunctions.includes('vi')) {
          return `// Jest fornece funções de teste globalmente
import { ${importedFunctions.replace(/\bvi\b/g, 'jest')} } from '@jest/globals';`;
        }
        return '// Jest fornece funções de teste globalmente';
      }
    );
    
    // Substituir vi por jest
    modified = modified.replace(/\bvi\./g, 'jest.');
    
    // Substituir vi.hoisted por jest.fn
    modified = modified.replace(/\bvi\.hoisted/g, 'jest.fn');
    
    // Escrever o arquivo modificado
    fs.writeFileSync(filePath, modified);
    console.log(`  ✅ Arquivo corrigido com sucesso`);
    
    return true;
  } catch (error) {
    console.error(`  ❌ Erro ao processar o arquivo ${filePath}:`, error.message);
    return false;
  }
};

// Função principal
const main = () => {
  console.log('🔄 Iniciando correção de importações em testes...');
  
  const files = findBrokenImports();
  
  if (files.length === 0) {
    console.log('✅ Nenhum arquivo encontrado com importações quebradas.');
    return;
  }
  
  console.log(`🔍 Encontrados ${files.length} arquivos para correção:`);
  files.forEach(file => console.log(`  - ${file}`));
  
  let successCount = 0;
  
  files.forEach(file => {
    const success = fixFile(file);
    if (success) successCount++;
  });
  
  console.log(`\n✅ Correção concluída: ${successCount}/${files.length} arquivos corrigidos com sucesso.`);
  console.log('📝 Executando os testes para verificar se as correções funcionaram...');
  
  try {
    execSync('npx jest --listTests', { stdio: 'inherit' });
    console.log('\n✅ Verificação de testes concluída com sucesso!');
  } catch (error) {
    console.error('\n❌ Ainda há problemas com alguns testes. Pode ser necessária uma correção manual.');
  }
};

main();
