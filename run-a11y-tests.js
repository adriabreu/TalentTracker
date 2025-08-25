#!/usr/bin/env node
/**
 * Script para executar apenas os testes de acessibilidade do TalentTracker
 * Este script executa apenas testes com o sufixo '-a11y.jest.test'
 * Versão ESM compatível com projetos que usam "type": "module" no package.json
 */

import { execSync } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual usando ESM
const __dirname = dirname(fileURLToPath(import.meta.url));

// Cores para output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

console.log(`${colors.blue}=== Executando testes de acessibilidade do TalentTracker ===${colors.reset}`);
console.log(`${colors.yellow}Buscando testes de acessibilidade...\n${colors.reset}`);

try {
  // Executa apenas os testes com o sufixo -a11y.jest.test
  execSync(
    'npx jest --config=unified-jest.config.cjs --testMatch="**/*-a11y.jest.test.(ts|tsx|js|jsx)" --verbose',
    { stdio: 'inherit' }
  );
  
  console.log(`\n${colors.green}✓ Testes de acessibilidade concluídos com sucesso!${colors.reset}`);
} catch (error) {
  console.log(`\n${colors.red}✗ Falha nos testes de acessibilidade${colors.reset}`);
  process.exit(1);
}
