// Configuração temporária e minimalista do Jest para testes específicos
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { 
      tsconfig: './tsconfig.json',
      isolatedModules: true
    }]
  },
  moduleDirectories: ['node_modules', 'src', 'client/src'],
  rootDir: '.',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/client/src/$1'
  },
  testMatch: [
    '**/__tests__/**/*.jest.test.(ts|tsx)',
    '**/?(*.)jest.test.(ts|tsx)'
  ],
  setupFilesAfterEnv: [],
  verbose: true
};
