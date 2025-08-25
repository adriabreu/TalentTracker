/**
 * Configuração Jest unificada para o projeto TalentTracker
 * Esta configuração substitui todas as configurações anteriores de Jest e Vitest
 */
module.exports = {
  // Ambiente de teste
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  
  // Resolução de módulos
  moduleNameMapper: {
    // Força a resolução de uma única instância do React para evitar erros
    '^react$': '<rootDir>/node_modules/react',
    '^react-dom$': '<rootDir>/node_modules/react-dom',
    '^react-dom/(.*)$': '<rootDir>/node_modules/react-dom/$1',
    'react/jsx-dev-runtime': '<rootDir>/node_modules/react/jsx-dev-runtime.js',
    
    // Mapeamentos de alias do projeto
    '^@/(.*)$': '<rootDir>/client/src/$1',
    '^@server/(.*)$': '<rootDir>/server/src/$1',
    '^@shared/(.*)$': '<rootDir>/shared/$1',
    
    // Mock específico para SavedFilters usado no CandidateFilterPanel
    '^../../../docs/examples/filtros-avancados/SavedFilters$': '<rootDir>/client/src/components/filters/__mocks__/SavedFilters',
    
    // Mocks para componentes Radix UI que podem não estar instalados
    '^@radix-ui/react-context-menu$': '<rootDir>/client/src/test/mocks/jest/radix-ui-empty-mock.js',
    '^@radix-ui/react-slider$': '<rootDir>/client/src/test/mocks/jest/radix-ui-empty-mock.js',
    '^@radix-ui/react-accordion$': '<rootDir>/client/src/test/mocks/jest/radix-ui-empty-mock.js',
    '^@radix-ui/react-popover$': '<rootDir>/client/src/test/mocks/jest/radix-ui-empty-mock.js',
    '^@radix-ui/react-toast$': '<rootDir>/client/src/test/mocks/jest/radix-ui-empty-mock.js',
    
    // Processamento de arquivos de estilo
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  
  // Transformação de arquivos
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.jest.json',
      useESM: true,
    }],
    '^.+\\.jsx?$': ['babel-jest', {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    }],
  },
  
  // Padrões de arquivos a ignorar para transformação
  transformIgnorePatterns: [
    '/node_modules/(?!(@radix-ui|lucide-react|react-hook-form|@hookform|@tanstack/react-query|wouter|drizzle-orm|drizzle-zod|zod)/)',
  ],
  
  // Configuração de arquivos de setup
  setupFilesAfterEnv: ['<rootDir>/client/src/setupTests.ts'],
  
  // Padrão unificado de nomenclatura de testes
  // Isso vai capturar tanto os testes Vitest quanto os testes Jest existentes
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/__tests__/**/*.jest.test.[jt]s?(x)',
    '**/tests/**/*.test.[jt]s?(x)',
    '**/tests/**/*.jest.test.[jt]s?(x)',
    '**/test/**/*.jest.test.[jt]s?(x)',
    '**/test/**/*.test.[jt]s?(x)',
    '**/src/**/*.jest.test.[jt]s?(x)',
  ],
  
  // Configuração de cobertura de código
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text', 'text-summary', 'html'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '\\.d\\.ts$',
    '/dist/',
    '/tests/',
    '/coverage/',
    '\\.config\\.[jt]s$'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    },
    './client/src/hooks/': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // Extensões para arquivos JS usados como módulos ESM
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.mts', '.jsx'],
  
  // Configuração para testes de acessibilidade
  modulePathIgnorePatterns: ['<rootDir>/node_modules/'],
};
