#!/usr/bin/env node
/**
 * Script para migração automatizada de testes Vitest para Jest
 * Criado em 13/07/2025
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Encontrar todos os arquivos de teste que importam vitest
const findVitestImports = () => {
  try {
    const result = execSync(
      'find ./client/src -type f -name "*.test.*" -exec grep -l "from \'vitest\'" {} \\;'
    ).toString().trim().split('\n');
    
    return result.filter(file => !file.includes('.bak') && file !== '');
  } catch (error) {
    console.error('Erro ao buscar arquivos com importações do Vitest:', error.message);
    return [];
  }
};

// Converter um arquivo de Vitest para Jest
const migrateFile = (filePath) => {
  console.log(`\nProcessando: ${filePath}`);
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Criar backup do arquivo original
    fs.writeFileSync(`${filePath}.bak`, content);
    console.log(`  ✅ Backup criado: ${filePath}.bak`);
    
    // Substituir importações
    let modified = content.replace(
      /import\s+\{\s*([\w\s,]+)\s*\}\s+from\s+['"]vitest['"];?/g, 
      (match, importedFunctions) => {
        // Se vi estiver sendo importado, substituir por @jest/globals
        if (importedFunctions.includes('vi')) {
          return `import { ${importedFunctions.replace(/\bvi\b/g, 'jest')} } from '@jest/globals';`;
        }
        // Caso contrário, remover a importação (Jest fornece globalmente)
        return '// Jest fornece funções de teste globalmente';
      }
    );
    
    // Substituir vi por jest
    modified = modified.replace(/\bvi\./g, 'jest.');
    
    // Substituir vi.hoisted por jest.fn
    modified = modified.replace(/\bvi\.hoisted/g, 'jest.fn');
    
    // Escrever o arquivo modificado
    fs.writeFileSync(filePath, modified);
    console.log(`  ✅ Arquivo migrado com sucesso`);
    
    return true;
  } catch (error) {
    console.error(`  ❌ Erro ao processar o arquivo ${filePath}:`, error.message);
    return false;
  }
};

// Função principal
const main = () => {
  console.log('🔄 Iniciando migração de Vitest para Jest...');
  
  const files = findVitestImports();
  
  if (files.length === 0) {
    console.log('✅ Nenhum arquivo encontrado com importações do Vitest.');
    return;
  }
  
  console.log(`🔍 Encontrados ${files.length} arquivos para migração:`);
  files.forEach(file => console.log(`  - ${file}`));
  
  let successCount = 0;
  
  files.forEach(file => {
    const success = migrateFile(file);
    if (success) successCount++;
  });
  
  console.log(`\n✅ Migração concluída: ${successCount}/${files.length} arquivos migrados com sucesso.`);
  console.log('📝 Lembre-se de executar os testes para verificar se tudo está funcionando corretamente.');
};

main();
