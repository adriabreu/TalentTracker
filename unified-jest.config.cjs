/**
 * Configuração Jest unificada para o TalentTracker
 * 
 * Este arquivo resolve o conflito entre as configurações Jest e Vitest
 * padronizando o ambiente de teste para usar exclusivamente Jest.
 * 
 * Características principais:
 * - Suporte adequado para ES Modules
 * - Compatibilidade com dependências modernas (incluindo wouter)
 * - Estratégia de mock consistente
 * - Transformações adequadas para arquivos TypeScript
 */

module.exports = {
  // Ambiente de execução
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
    url: 'http://localhost'
  },
  
  // Configuração de arquivos e diretórios
  roots: ['<rootDir>'],
  moduleDirectories: ['node_modules', 'src'],
  modulePaths: ['<rootDir>'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
  // Setup de testes
  setupFilesAfterEnv: [
    '<rootDir>/client/src/setupTests.unified.ts'
  ],
  
  // Padrões para encontrar arquivos de teste
  testMatch: [
    '**/__tests__/**/*.jest.test.(ts|tsx|js|jsx)',
    '**/?(*.)jest.test.(ts|tsx|js|jsx)',
    '**/src/**/*.jest.test.(ts|tsx|js|jsx)',
  ],
  
  // Arquivos a ignorar
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/',
    '/playwright-tests/',
    '/cypress/',
    '\\.vitest\\.',
  ],
  
  // Mapeamento de módulos
  moduleNameMapper: {
    // Arquivos estáticos e estilos
    '\\.(jpg|jpeg|png|gif|webp|svg|css|less|scss|sass|module\\.css|module\\.scss)$': 'identity-obj-proxy',
    
    // Mapeamento de alias do projeto
    '^@/(.*)$': '<rootDir>/client/src/$1',
    '^@server/(.*)$': '<rootDir>/server/src/$1',
    '^@shared/(.*)$': '<rootDir>/shared/$1',
    '^@assets/(.*)$': '<rootDir>/attached_assets/$1',
    
    // Mocks do Material-UI
    '^@mui/material$': '<rootDir>/client/src/__mocks__/@mui/material.ts',
    '^@mui/material/(.*)$': '<rootDir>/client/src/__mocks__/@mui/material.ts',
    '^@mui/icons-material$': '<rootDir>/client/src/__mocks__/@mui/icons-material.ts',
    '^@mui/icons-material/(.*)$': '<rootDir>/client/src/__mocks__/@mui/icons-material.ts',
    
    // Mocks específicos para componentes UI - mapeamento exato para cada componente
    "^@/components/ui/(.*)$": "<rootDir>/client/src/__mocks__/ui/$1",
    "^../ui$": "<rootDir>/client/src/__mocks__/ui/index.ts",
    "^../ui/card$": "<rootDir>/client/src/__mocks__/ui/card.ts",
    "^../ui/button$": "<rootDir>/client/src/__mocks__/ui/button.ts",
    "^../ui/input$": "<rootDir>/client/src/__mocks__/ui/input.ts",
    "^../ui/tabs$": "<rootDir>/client/src/__mocks__/ui/tabs.ts",
    "^../ui/select$": "<rootDir>/client/src/__mocks__/ui/select.ts",
    "^../ui/badge$": "<rootDir>/client/src/__mocks__/ui/badge.ts",
    "^../ui/table$": "<rootDir>/client/src/__mocks__/ui/table.ts",
    "^../ui/checkbox$": "<rootDir>/client/src/__mocks__/ui/checkbox.ts",
    "^../ui/tooltip$": "<rootDir>/client/src/__mocks__/ui/tooltip.ts",
    "^../ui/dialog$": "<rootDir>/client/src/__mocks__/ui/dialog.ts",
    "^../ui/slider$": "<rootDir>/client/src/__mocks__/ui/slider.ts",
    // Fallback para outros componentes UI
    "^../ui/(.*)$": "<rootDir>/client/src/__mocks__/ui/$1",
    
    // Mocks para os componentes de filtro
    "^../CandidateFilterPanel$": "<rootDir>/client/src/__mocks__/CandidateFilterPanel.tsx",
    "^../../../services/filterStorageService$": "<rootDir>/client/src/__mocks__/services/filterStorageService.ts",
    "^@/services/filterStorageService$": "<rootDir>/client/src/__mocks__/services/filterStorageService.ts",
    
    // Mocks para componentes de dashboard e filtros
    "^../components/dashboard/metrics-cards$": "<rootDir>/client/src/__mocks__/dashboard.tsx",
    "^../metrics-cards$": "<rootDir>/client/src/__mocks__/dashboard.tsx",
    "^../components/filters/SkillAvailabilityFilter$": "<rootDir>/client/src/__mocks__/filters.tsx",
    "^../components/filters/CompetencyFilter$": "<rootDir>/client/src/__mocks__/filters.tsx",
    "^../components/filters/QueryBuilder$": "<rootDir>/client/src/__mocks__/filters.tsx",
    "^../components/filters/AdvancedQueryFilter$": "<rootDir>/client/src/__mocks__/filters.tsx",
    "^../components/filters/FilterManager$": "<rootDir>/client/src/__mocks__/filters.tsx",
    "^../components/filters/SavedFilters$": "<rootDir>/client/src/__mocks__/filters.tsx",
    "^../components/filters/ThemeAwareFilter$": "<rootDir>/client/src/__mocks__/filters.tsx",
    
    // Mock para o módulo UI geral
    "^../../ui$": "<rootDir>/client/src/__mocks__/ui.tsx",
    "^../ui$": "<rootDir>/client/src/__mocks__/ui.tsx",
    "^ui$": "<rootDir>/client/src/__mocks__/ui.tsx",
    "^ui/ui$": "<rootDir>/client/src/__mocks__/ui/ui.tsx",
    
    // Mocks para SavedFilters
    "^../../../../docs/examples/filtros-avancados/SavedFilters$": "<rootDir>/client/src/__mocks__/docs/examples/filtros-avancados/SavedFilters.tsx",
    "^../../../docs/examples/filtros-avancados/SavedFilters$": "<rootDir>/client/src/__mocks__/docs/examples/filtros-avancados/SavedFilters.tsx",
    
    // Mocks para componentes de dashboard
    "^../../components/dashboard/CandidateComparison$": "<rootDir>/client/src/__mocks__/components/dashboard/CandidateComparison.tsx",
    "^../components/dashboard/CandidateComparison$": "<rootDir>/client/src/__mocks__/components/dashboard/CandidateComparison.tsx",
    "^../CandidateComparison$": "<rootDir>/client/src/__mocks__/components/dashboard/CandidateComparison.tsx",
    "^../../components/dashboard/CandidateDashboard$": "<rootDir>/client/src/__mocks__/components/dashboard/CandidateDashboard.tsx",
    "^../components/dashboard/CandidateDashboard$": "<rootDir>/client/src/__mocks__/components/dashboard/CandidateDashboard.tsx",
    "^../CandidateDashboard$": "<rootDir>/client/src/__mocks__/components/dashboard/CandidateDashboard.tsx",
    
    // Mocks para componentes de filtros
    "^../../components/filters/CandidateFilterPanel$": "<rootDir>/client/src/__mocks__/components/filters/CandidateFilterPanel.tsx",
    "^../components/filters/CandidateFilterPanel$": "<rootDir>/client/src/__mocks__/components/filters/CandidateFilterPanel.tsx",
    "^../../components/filters/SkillAvailabilityFilter$": "<rootDir>/client/src/__mocks__/components/filters/SkillAvailabilityFilter.tsx",
    "^../components/filters/SkillAvailabilityFilter$": "<rootDir>/client/src/__mocks__/components/filters/SkillAvailabilityFilter.tsx",
    "^../SkillAvailabilityFilter$": "<rootDir>/client/src/__mocks__/components/filters/SkillAvailabilityFilter.tsx",
    "^../../components/filters/CompetencyFilter$": "<rootDir>/client/src/__mocks__/components/filters/CompetencyFilter.tsx",
    "^../components/filters/CompetencyFilter$": "<rootDir>/client/src/__mocks__/components/filters/CompetencyFilter.tsx",
    "^../CompetencyFilter$": "<rootDir>/client/src/__mocks__/components/filters/CompetencyFilter.tsx",
    
    // Mocks para componentes de timeline
    "^../../components/candidates/timeline/TimelineEventForm$": "<rootDir>/client/src/components/candidates/timeline/__tests__/__mocks__/TimelineEventForm.tsx",
    "^../components/candidates/timeline/TimelineEventForm$": "<rootDir>/client/src/components/candidates/timeline/__tests__/__mocks__/TimelineEventForm.tsx",
    "^../TimelineEventForm$": "<rootDir>/client/src/components/candidates/timeline/__tests__/__mocks__/TimelineEventForm.tsx",
    
    // Mocks de bibliotecas e serviços
    '^recharts$': '<rootDir>/client/src/__mocks__/recharts.tsx',
    '^react-toastify$': '<rootDir>/client/src/__mocks__/react-toastify',
    '^@dnd-kit/core$': '<rootDir>/client/src/__mocks__/@dnd-kit/core.tsx',
    '^@dnd-kit/sortable$': '<rootDir>/client/src/__mocks__/@dnd-kit/sortable.tsx',
    '^@dnd-kit/utilities$': '<rootDir>/client/src/__mocks__/@dnd-kit/utilities.tsx',
    '^@material-ui/core$': '<rootDir>/client/src/__mocks__/@material-ui/core.tsx',
    '^@/services/authService$': '<rootDir>/client/src/__mocks__/authService',
    '^@/services/mfaService$': '<rootDir>/client/src/__mocks__/mfaService',
    '^@/services/passwordService$': '<rootDir>/client/src/__mocks__/passwordService',
    '^../services/api$': '<rootDir>/client/src/services/__mocks__/api.ts',
    '^@/services/api$': '<rootDir>/client/src/__mocks__/services/api',
    
    // Mocks de componentes
    '^../QueryBuilder$': '<rootDir>/client/src/components/filters/__tests__/__mocks__/QueryBuilder.tsx',
    '^../CandidateTimeline$': '<rootDir>/client/src/components/candidates/timeline/__tests__/__mocks__/CandidateTimeline.tsx',
    '^../CandidateFilterPanel$': '<rootDir>/client/src/components/filters/__tests__/__mocks__/CandidateFilterPanel.tsx',
    '^../../../ui$': '<rootDir>/client/src/components/dashboard/__tests__/__mocks__/ui.tsx',
    
    // Forçar a resolução de uma única instância do React para evitar o erro 'useRef is null'
    '^react$': '<rootDir>/node_modules/react',
    '^react-dom$': '<rootDir>/node_modules/react-dom',
    '^react-dom/(.*)$': '<rootDir>/node_modules/react-dom/$1',
  },
  
  // Configuração de transformação
  transform: {
    // TypeScript com ts-jest para lidar com ESM
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.jest.json',
      useESM: true,
    }],
    // JavaScript com babel-jest
    '^.+\\.(js|jsx)$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-react',
        '@babel/preset-typescript'
      ],
    }],
  },
  
  // Padrões a ignorar na transformação
  transformIgnorePatterns: [
    // Evita ignorar módulos ESM comuns que causam problemas
    '/node_modules/(?!(@radix-ui|lucide-react|react-hook-form|@hookform|@tanstack/react-query|wouter|drizzle-orm|drizzle-zod|zod)/)',
  ],
  
  // Habilitar suporte a ESM
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  
  // Configuração de cobertura de código - temporariamente desativada
  collectCoverage: false,
  
  // Configuração de relatórios
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        pageTitle: 'TalentTracker Test Report',
        outputPath: 'test-report/index.html',
        includeFailureMsg: true,
        includeConsoleLog: true,
      },
    ],
  ],
  
  // Mostrar saída detalhada para depuração
  verbose: true,
};
