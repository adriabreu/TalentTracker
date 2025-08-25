module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  moduleNameMapper: {
    // Força a resolução de uma única instância do React para evitar o erro 'useRef is null'.
    '^react$': '<rootDir>/node_modules/react',
    '^react-dom$': '<rootDir>/node_modules/react-dom',
    '^react-dom/(.*)$': '<rootDir>/node_modules/react-dom/$1',

    // Mapeamentos de alias do projeto
    '^@/(.*)$': '<rootDir>/client/src/$1',
    '^@server/(.*)$': '<rootDir>/server/src/$1',
    '^@shared/(.*)$': '<rootDir>/shared/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    // Processamento de arquivos JS/JSX usando babel-jest com configuração específica
    '^.+\\.(js|jsx)$': ['babel-jest', { configFile: './client/babel.jest.config.js' }],
    // Processamento de arquivos TS/TSX usando babel-jest com a mesma configuração específica
    // Isto garante que o JSX será processado corretamente em arquivos .tsx
    '^.+\\.(ts|tsx)$': ['babel-jest', { configFile: './client/babel.jest.config.js' }]
  },

  transformIgnorePatterns: [
    '/node_modules/(?!(@radix-ui|lucide-react|react-hook-form|@hookform|@tanstack/react-query|wouter|drizzle-orm|drizzle-zod|zod)/)',
  ],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/client/src/setupTests.ts'],
  testMatch: ['**/__tests__/**/*.jest.test.(ts|tsx)', '**/__tests__/**/*.test.(ts|tsx)'],
  
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
  }
};
