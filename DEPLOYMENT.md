# Guia de Deploy - TalentTracker

Este documento descreve o processo completo de deploy do TalentTracker em ambiente de produção.

## 📋 Pré-requisitos

- Node.js 18+ e npm 8+
- PostgreSQL 14+ (ou acesso a banco Neon/Supabase)
- Conta Vercel (para deploy frontend/backend)
- Variáveis de ambiente configuradas

## 🔑 Variáveis de Ambiente

Copie `.env.example` para `.env.production` e configure:

```bash
# Essenciais para produção
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=sua_chave_super_segura_aqui
REFRESH_TOKEN_SECRET=outra_chave_super_segura_aqui
NODE_ENV=production
CORS_ORIGIN=https://seu-dominio.com
```

## 🏗️ Processo de Build

### Backend

```bash
cd server
npm ci                # Instala dependências de forma limpa
npm run build         # Transpila TypeScript para JavaScript
npm run db:migrate    # Aplica migrações ao banco
```

### Frontend

```bash
cd client
npm ci                # Instala dependências de forma limpa
npm run build         # Cria build otimizada para produção
```

## 🚀 Deploy Manual

### Backend

1. Configure seu servidor Node.js (PM2, Docker, etc.)
2. Copie os arquivos de build: `server/dist`
3. Configure as variáveis de ambiente no servidor
4. Execute o servidor: `node dist/index.js`

### Frontend

1. Configure seu servidor web (NGINX, Apache, etc.)
2. Copie os arquivos estáticos: `client/dist`
3. Configure CORS e redirecionamentos para a API

## ⚡ Deploy Automático via Vercel

1. Conecte seu repositório à Vercel
2. Configure as variáveis de ambiente na interface da Vercel
3. Configure os comandos de build:
   - Frontend: `cd client && npm install && npm run build`
   - Backend: `cd server && npm install && npm run build`
4. Configure o diretório de saída:
   - Frontend: `client/dist`
   - Backend: `server/dist`

## 📦 Estrutura do Deploy

```
vercel.json          # Configuração principal do Vercel
package.json         # Scripts para deploy
server/              # Backend
  dist/              # Build transpilado
  src/               # Código fonte
client/              # Frontend
  dist/              # Build estático
  src/               # Código fonte
shared/              # Módulos compartilhados
```

## 🔄 Migrações de Banco de Dados

Execute as migrações como parte do deploy:

```bash
# No servidor ou via CI/CD
npm run db:migrate
```

Para rollback em caso de problemas:

```bash
npm run db:rollback
```

## 🧪 Validação Pós-Deploy

1. Execute os testes de smoke:
   ```bash
   npm run test:smoke
   ```

2. Verifique pontos críticos:
   - Login/Autenticação
   - Criação de vagas
   - Candidaturas
   - Upload de documentos (se implementado)

## 🔄 Atualização Contínua

Para futuras atualizações em produção:

1. Utilize implantações sem interrupção (zero-downtime)
2. Execute migrações compatíveis com versões anteriores
3. Utilize feature flags para novos recursos

## 🛡️ Backup e Recuperação

Estratégia de backup:
- Banco de dados: backup diário completo
- Dados de upload: backup incremental
- Configurações: versionadas no repositório

## 📞 Suporte Pós-Deploy

Em caso de problemas:
- Logs: `/var/log/talenttracker/`
- Monitoramento: Dashboard Vercel/Analytics
- Contato: suporte@talenttracker.com
