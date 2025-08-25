/** @type {import('jest').Config} */
const config = {
  // Configuração básica essencial
  testEnvironment: 'jsdom',
  verbose: true,
  testTimeout: 15000,
  
  // === TRANSFORMAÇÕES ===
  // Abordagem robusta usando babel-jest para todos os arquivos JS/TS/JSX/TSX
  transform: {
    // Usar babel-jest para todos os arquivos para garantir processamento consistente de JSX/TSX
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
        ['@babel/preset-react', { runtime: 'automatic' }]
      ],
      plugins: [
        '@babel/plugin-transform-runtime'
      ]
    }]
  },
  
  // === EXTENSÕES DE ARQUIVO ===
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
  // === PADRÕES DE TESTE ===
  testMatch: [
    // Arquivo minimal básico
    '**/minimal.test.js',
    // Testes isolados que criamos
    '**/isolated-complete.jest.test.js',
    // Teste JSX básico
    '**/basic-jsx.test.jsx',
    // Teste TSX simplificado
    '**/simple-jsx.test.tsx',
    // Novo teste de compatibilidade compacta
    '**/compact-test.tsx'
    // Não incluir o teste de compatibilidade Jest-Vitest ainda
    // '**/jest-vitest-compat.test.ts'
  ],
  
  // === CONFIGURAÇÕES AVANÇADAS ===
  setupFilesAfterEnv: [
    // Apenas arquivo de compatibilidade Jest-Vitest, sem outros setups
    '<rootDir>/client/src/test/jest-vitest-compat.ts'
  ],
  
  // === REPORTERS ===
  reporters: ['default'],
  
  // === CONFIGURAÇÕES DE EXECUÇÃO ===
  // Forçar saída após conclusão - importante para evitar processos pendentes
  forceExit: true,
  
  // === CONFIGURAÇÕES DE MÓDULOS ===
  moduleNameMapper: {
    // Mapear importações de estilo para mock
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // Mapear arquivos estáticos para mock
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js"
  },
  
  // Desabilitar coleta de cobertura para simplificar
  collectCoverage: false,
  
  // Adicione rootDir explicitamente
  rootDir: '.',
  
  // Configurações adicionais para evitar problemas comuns
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  
  // Nunca pular testes
  bail: 0,
  
  // Mensagens de erro detalhadas
  errorOnDeprecated: true,
};

module.exports = config;
