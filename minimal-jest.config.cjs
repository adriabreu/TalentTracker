/** @type {import('jest').Config} */
const config = {
  // Configuração mínima, apenas o essencial
  testEnvironment: 'jsdom',
  verbose: true,
  testTimeout: 5000,
  // Sem setupFiles ou setupFilesAfterEnv para evitar qualquer configuração adicional
  // Sem reporters personalizados
  reporters: ['default'],
  // Sem transformers personalizados
  transform: {
    // Apenas o básico para JS/TS
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  // Padrão de teste simples
  testMatch: ['**/minimal.test.js'],
  // Forçar saída após conclusão
  forceExit: true,
  // Desativar coleta de cobertura
  collectCoverage: false
};

module.exports = config;
