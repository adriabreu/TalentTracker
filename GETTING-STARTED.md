# TalentTracker - Guia de Início Rápido

Este guia fornece instruções passo a passo para configurar o ambiente de desenvolvimento do TalentTracker localmente.

## Pré-requisitos

- **Node.js**: v18+ (recomendado v20 LTS)
- **npm**: v9+ ou v10+
- **Docker** e **Docker Compose**: para os serviços de infraestrutura
- **k6** (opcional): para testes de carga e funcionais
- **jq** (opcional): para manipulação de JSON no terminal

## Configuração do Ambiente

### 1. Serviços de Infraestrutura (PostgreSQL e Redis)

Utilize o Docker Compose para iniciar os serviços necessários:

```bash
# Na raiz do projeto
docker compose -f docker-compose.dev.yml up -d
```

Isso iniciará:
- **PostgreSQL** na porta 5432
- **Redis** na porta 6379

Você pode verificar se os serviços estão rodando com:

```bash
docker compose -f docker-compose.dev.yml ps
```

### 2. Configuração do Backend

```bash
# Entre no diretório do servidor
cd server

# Copie o arquivo de exemplo de variáveis de ambiente
cp .env.example .env

# Instale as dependências
npm install

# Execute as migrações do banco de dados
npm run migrate

# (Opcional) Popule o banco com dados de teste
npm run seed

# Inicie o servidor em modo de desenvolvimento
npm run dev
```

O servidor estará disponível em `http://localhost:3001`.

### 3. Configuração do Frontend

```bash
# Entre no diretório do cliente
cd ../client

# Copie o arquivo de exemplo de variáveis de ambiente
cp .env.example .env

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O frontend estará disponível no endereço indicado pelo terminal (geralmente `http://localhost:5173`).

## Teste de Autenticação

Você pode testar o fluxo de autenticação usando `curl`:

```bash
# Login (substitua com credenciais válidas)
TOKEN=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@talenttracker.com","password":"Admin@123"}' | jq -r '.data.tokens.accessToken')

# Verificar usuário logado
curl -s http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer $TOKEN" | jq

# Logout
curl -s -X POST http://localhost:3001/api/auth/logout \
  -H "Authorization: Bearer $TOKEN"

# Tentar acessar com token revogado (deve retornar 401)
curl -s http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer $TOKEN" | jq
```

## Testes Funcionais com k6 (Opcional)

```bash
# Na raiz do projeto
k6 run k6/auth.k6.js
```

## Validar Melhorias de Segurança

### 1. Request ID

```bash
# Envie um x-request-id personalizado
curl -s -H "x-request-id: test-123" http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer $TOKEN" | grep -i x-request-id
```

Cada resposta da API deve incluir um header `x-request-id`.

### 2. Rate Limiting

Envie 11 requisições rápidas para `/auth/login`. A 11ª deve retornar status 429 com mensagem de erro `RATE_LIMITED`.

### 3. Blacklist de Tokens (após logout)

```bash
# Verificar se o token foi armazenado no Redis após logout
docker exec -it talenttracker-redis redis-cli keys "*" | grep token
```

### 4. Verificação JWT Robusta

As validações de JWT agora incluem verificação de `issuer`, `audience` e tolerância de relógio.

## Variáveis de Ambiente

### Backend (.env)

```
# Porta do servidor
PORT=3001

# Banco de dados
DATABASE_URL=postgres://postgres:postgres@localhost:5432/talenttracker

# JWT
JWT_SECRET=change_me_dev_secret
JWT_ISS=talenttracker
JWT_AUD=talenttracker-app
JWT_CLOCK_TOLERANCE_S=60

# Redis
REDIS_URL=redis://localhost:6379/0
USE_REDIS_BLACKLIST=true

# Rate limiting
RL_LOGIN_WINDOW_MS=60000
RL_LOGIN_MAX=10
RL_REFRESH_WINDOW_MS=60000
RL_REFRESH_MAX=30
RL_ME_WINDOW_MS=60000
RL_ME_MAX=120
```

### Frontend (.env)

```
VITE_API_BASE_URL=http://localhost:3001/api
```

## Documentação da API

Importe o arquivo `docs/openapi/auth.yaml` no Swagger UI ou Insomnia para explorar os endpoints da API.

## Solução de Problemas

### Erro de conexão com o banco de dados

Verifique se:
1. O container do PostgreSQL está rodando: `docker ps | grep talenttracker-db`
2. As credenciais no arquivo `.env` estão corretas

### Erro de conexão com o Redis

Verifique se:
1. O container do Redis está rodando: `docker ps | grep talenttracker-redis`
2. A URL no arquivo `.env` está correta

### Erros de tipagem TypeScript

Execute:
```bash
npm run lint
```

Para ver erros específicos, e corrija-os antes de compilar o projeto.
