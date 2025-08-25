/** @type {import('jest').Config} */
const config = {
  // Configuração básica essencial
  testEnvironment: 'jsdom',
  verbose: true,
  testTimeout: 15000,
  
  // Configurações progressivas - descomente uma por uma para testar
  
  // === TRANSFORMAÇÕES ===
  transform: {
    // Processamento de arquivos JS/JSX usando babel-jest
    '^.+\\.(js|jsx)$': 'babel-jest',
    // Processamento de arquivos TS/TSX usando ts-jest com configuração específica
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      isolatedModules: true,
      // Ignora códigos de erro comuns que podem interferir nos testes
      diagnostics: {
        ignoreCodes: [2307, 2339, 2322, 2345, 1005, 1134, 1161]
      },
      // Forçar jsx: react-jsx para garantir processamento correto de JSX em arquivos TS
      jsx: 'react-jsx',
      // Configurar para processar corretamente JSX em arquivos TS
      tsconfig: {
        jsx: 'react-jsx',
        esModuleInterop: true,
        allowJs: true
      }
    }]
  },
  
  // === PADRÕES DE TESTE ===
  // Expandindo os padrões de teste para incluir mais casos
  testMatch: [
    // Arquivo minimal básico
    '**/minimal.test.js',
    // Testes isolados que criamos
    '**/isolated-complete.jest.test.js',
    // Teste JSX básico
    '**/basic-jsx.test.jsx',
    // Teste de compatibilidade Jest-Vitest
    '**/jest-vitest-compat.test.ts'
  ],
  
  // === CONFIGURAÇÕES AVANÇADAS ===
  // Incluir apenas o arquivo de compatibilidade Jest-Vitest
  setupFilesAfterEnv: [
    // Arquivo de compatibilidade Jest-Vitest
    '<rootDir>/client/src/test/jest-vitest-compat.ts'
  ],
  
  // === REPORTERS ===
  // Apenas reporter padrão no início
  reporters: ['default'],
  // Descomente para adicionar reporters adicionais
  /*
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'Test Report',
      outputPath: 'test-report/index.html',
      includeFailureMsg: true,
      includeConsoleLog: true,
    }],
  ],
  */
  
  // === CONFIGURAÇÕES DE EXECUÇÃO ===
  // Forçar saída após conclusão - importante para evitar processos pendentes
  forceExit: true,
  
  // === CONFIGURAÇÕES DE MÓDULOS ===
  // Inicialmente apenas configurações básicas
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
  // Desabilitar coleta de cobertura para simplificar
  collectCoverage: false,
  
  // Adicione rootDir explicitamente
  rootDir: '.',
};

module.exports = config;
