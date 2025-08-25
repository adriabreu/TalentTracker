# TalentTracker 🚀

<div align="center">

![TalentTracker Logo](./attached_assets/logo.png)

**Sistema completo de recrutamento, seleção e gestão de talentos com integração de IA**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-000000?style=flat-square)](https://orm.drizzle.team/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white)](https://jestjs.io/)

</div>

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Execução](#execução)
- [Stack de Tecnologia](#stack-de-tecnologia)
- [Banco de Dados](#banco-de-dados)
- [Testes](#testes)
- [Documentação da API](#documentação-da-api)
- [Convenções de Código](#convenções-de-código)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 👀 Visão Geral

O **TalentTracker** é uma plataforma completa para recrutamento, seleção e gestão de talentos, desenvolvida para modernizar e simplificar processos de RH através da tecnologia. O sistema gerencia todo o ciclo de vida do recrutamento, desde a publicação de vagas até a contratação e onboarding, com suporte de IA para otimizar decisões e automatizar tarefas.

## ✨ Funcionalidades

### 👔 Recrutamento e Seleção
- **Gestão de Vagas**: Publicação, edição e monitoramento de vagas
- **Integração com Job Boards**: LinkedIn, Indeed, Glassdoor
- **Pipeline de Candidatos**: Acompanhamento visual do processo seletivo
- **Busca Avançada**: Filtros por habilidades, experiência, localização

### 🤖 Recursos de IA
- **Triagem Automática**: Análise de currículos e matching com vagas
- **Assistente de Entrevistas**: Geração de perguntas baseadas no perfil da vaga
- **Recomendações**: Sugestão automática de candidatos para vagas
- **Insights**: Análises de mercado e tendências de contratação

### 📊 Analytics
- **Dashboard Personalizado**: Métricas em tempo real do processo de recrutamento
- **Relatórios**: Tempo de preenchimento, custos, fontes de candidatos
- **Previsões**: Análise preditiva de necessidades de contratação

### 📱 Experiência do Candidato
- **Portal de Candidatos**: Área personalizada para acompanhamento do processo
- **Feedback Automático**: Comunicações personalizadas em cada etapa
- **Agendamento Integrado**: Sistema de marcação de entrevistas

## 🗂️ Estrutura do Projeto

O TalentTracker segue uma arquitetura modular com separação clara entre frontend, backend e recursos compartilhados:

```
TalentTracker/
├── client/               # Frontend (React + TypeScript)
│   ├── src/              # Código fonte do frontend
│   │   ├── components/   # Componentes reutilizáveis
│   │   ├── pages/        # Páginas da aplicação
│   │   ├── hooks/        # React hooks customizados
│   │   ├── services/     # Serviços e comunicação com API
│   │   ├── contexts/     # Contextos React
│   │   └── utils/        # Utilitários
│   ├── public/           # Assets estáticos
│   └── __tests__/        # Testes do frontend
│
├── server/               # Backend (Express + TypeScript)
│   ├── src/              # Código fonte do backend
│   │   ├── controllers/  # Controladores das rotas
│   │   ├── services/     # Lógica de negócio
│   │   ├── routes/       # Definição de rotas
│   │   ├── middleware/   # Middleware Express
│   │   ├── utils/        # Utilitários
│   │   └── interfaces/   # Interfaces TypeScript
│   └── tests/            # Testes do backend
│
├── shared/               # Código compartilhado
│   ├── types/            # Tipos TypeScript comuns
│   │   ├── schema.types.ts # Tipos extraídos dos schemas do banco de dados
│   │   ├── auth.types.ts   # Tipos relacionados à autenticação
│   │   ├── job.types.ts    # Tipos relacionados a vagas
│   │   └── ...            # Outros domínios de tipos
│   └── schema/           # Schemas de banco de dados (apenas implementação, não tipos)
│
├── scripts/              # Scripts de automação
├── docs/                 # Documentação adicional
└── config/               # Configurações do projeto
```

## 🛠️ Requisitos

### Requisitos de Sistema
- **Node.js**: v18.0.0 ou superior
- **PostgreSQL**: v14.0 ou superior
- **NPM**: v8.0.0 ou superior (ou Yarn v1.22.0+)
- **Git**: Para controle de versão

### Ferramentas Recomendadas
- **VS Code**: Com extensões para TypeScript e ESLint
- **pgAdmin**: Para gerenciamento visual do banco de dados
- **Insomnia/Postman**: Para testar endpoints da API

## 📦 Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/talent-tracker.git
cd TalentTracker

# Instalar dependências do projeto
npm install

# Configurar variáveis de ambiente
cp env.example .env
# Edite o arquivo .env com suas credenciais

# Configurar o banco de dados
npm run db:setup  # Cria o banco e executa migrações iniciais

# Dados iniciais (opcional)
npm run db:seed   # Carrega dados de exemplo para desenvolvimento
```

## ▶️ Execução

### Ambiente de Desenvolvimento

```bash
# Iniciar o servidor de desenvolvimento (backend + frontend)
npm run dev

# Ou iniciar separadamente
npm run dev:client  # Apenas frontend
npm run dev:server  # Apenas backend
```

### Ambiente de Produção

```bash
# Construir para produção
npm run build

# Iniciar em produção
npm run start

# Usando PM2 (recomendado para produção)
npm run start:pm2
```

### Scripts Úteis

```bash
# Verificar tipos TypeScript
npm run type-check

# Executar linter
npm run lint

# Corrigir problemas de lint automaticamente
npm run lint:fix

# Executar testes
npm run test

# Executar testes com cobertura
npm run test:coverage
```

### Portas e Endpoints

- **Frontend**: http://localhost:3000
- **API Backend**: http://localhost:5000/api
- **Documentação API**: http://localhost:5000/api-docs

## 💻 Stack de Tecnologia

### Frontend
- **React**: Biblioteca para construção de interfaces
- **TypeScript**: Linguagem principal
- **React Router**: Navegação
- **Axios**: Cliente HTTP
- **TanStack Query**: Gerenciamento de estado de dados
- **Tailwind CSS**: Framework CSS
- **Shadcn UI**: Componentes UI
- **Zustand**: Gerenciamento de estado
- **React Hook Form**: Gerenciamento de formulários
- **Zod**: Validação de dados

### Backend
- **Node.js**: Runtime JavaScript
- **Express**: Framework web
- **TypeScript**: Linguagem principal
- **PostgreSQL**: Banco de dados relacional
- **Drizzle ORM**: ORM para PostgreSQL
- **JSON Web Token**: Autenticação
- **Zod**: Validação de dados
- **Winston**: Logging

### DevOps & Ferramentas
- **Jest**: Framework de testes
- **ESLint**: Linting de código
- **Prettier**: Formatação de código
- **Husky**: Hooks de Git
- **Docker**: Containerização
- **GitHub Actions**: CI/CD

## 🏗️ Arquitetura de Tipos Compartilhados

O TalentTracker implementa uma separação clara entre **tipos** e **implementação** para garantir a compatibilidade entre frontend e backend:

### Separação entre Tipos e Implementação

- **Arquivos de Tipos (`/shared/types/`)**: Contêm apenas interfaces e types TypeScript sem dependências de runtime
  - Podem ser importados com segurança tanto pelo frontend quanto pelo backend
  - Organizados por domínio (auth, job, candidate, etc.)
  - Incluem `schema.types.ts` com tipos extraídos dos schemas do banco de dados

- **Arquivos de Schema (`/shared/schema/`)**: Contêm implementações concretas usando Drizzle ORM
  - Usados apenas pelo backend e scripts de migração
  - Dependem de pacotes como `drizzle-orm` que não são compatíveis com o browser
  - A implementação não deve ser importada pelo frontend

### Padrão de Importação

```typescript
// ✅ CORRETO: No frontend, importar apenas tipos
import type { User, UserRole } from "@shared/types/auth.types";
import type { JobPosting } from "@shared/types/schema.types";

// ❌ INCORRETO: No frontend, nunca importar do schema diretamente
// import { users, jobPostings } from "@shared/schema";

// ✅ CORRETO: No backend, importar implementação do schema
import { users, jobPostings } from "@shared/schema";
// E tipos dos arquivos de tipos
import type { CreateUserDTO } from "@shared/types/auth.types";
```

Esta arquitetura previne problemas de bundling no frontend ao evitar que dependências exclusivas do backend sejam incluídas no bundle final da aplicação.

## 💾 Banco de Dados

### Esquema do Banco de Dados

O TalentTracker usa PostgreSQL com Drizzle ORM. O esquema inclui as seguintes entidades principais:

- **Users**: Usuários do sistema e autenticação
- **Candidates**: Candidatos a vagas
- **JobPostings**: Vagas publicadas
- **Applications**: Candidaturas para vagas
- **Companies**: Empresas cadastradas
- **Skills**: Habilidades e competências
- **JobBoards**: Integrações com portais de emprego

### Migrações

O projeto utiliza Drizzle para gerenciar migrações de banco de dados:

```bash
# Criar uma nova migração
npm run db:migration:create

# Executar migrações pendentes
npm run db:migrate

# Reverter última migração
npm run db:migrate:undo
```

## 🧪 Testes

O projeto utiliza Jest como framework de testes:

```bash
# Executar todos os testes
npm run test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage

# Executar testes de integração
npm run test:integration

# Executar testes e2e
npm run test:e2e
```

## 📚 Documentação da API

A documentação completa da API está disponível no arquivo [API.md](./API.md). Você também pode acessar a documentação interativa Swagger em http://localhost:5000/api-docs quando o servidor estiver em execução.

Principais endpoints:

- `/api/auth` - Autenticação e gerenciamento de usuários
- `/api/candidates` - Gerenciamento de candidatos
- `/api/jobs` - Gestão de vagas
- `/api/companies` - Gerenciamento de empresas
- `/api/applications` - Candidaturas e processos seletivos
- `/api/job-boards` - Integração com portais de emprego

## 📏 Convenções de Código

O projeto segue as convenções documentadas em [CODING-STANDARDS.md](./CODING-STANDARDS.md), que inclui:

- Padrões de nomenclatura
- Organização de arquivos e diretórios
- Padrões de importação
- Documentação de código
- Tratamento de erros
- Estratégias de teste

Recomendamos a leitura dessas diretrizes antes de contribuir com o projeto.

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
3. Faça commit das suas mudanças (`git commit -m 'Add: amazing feature'`)
4. Envie para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

Por favor, certifique-se de atualizar os testes conforme apropriado e seguir as convenções de código descritas em [CODING-STANDARDS.md](./CODING-STANDARDS.md).

### Diretrizes de Commit

Utilizamos o padrão Conventional Commits:

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Alterações na documentação
- `style:` Formatação, ponto e vírgula, etc; sem alteração de código
- `refactor:` Refatoração de código
- `test:` Adição/correção de testes
- `chore:` Alterações em ferramentas de build, configurações, etc

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

<div align="center">

**TalentTracker** - Transformando recrutamento e seleção com tecnologia e IA 🚀

Desenvolvido com ❤️ por Equipe TalentTracker

</div>
