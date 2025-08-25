# TalentTracker API Documentation

## Visão Geral

A API do TalentTracker fornece endpoints para gerenciar todo o ciclo de vida do recrutamento, desde a publicação de vagas até a contratação de candidatos, incluindo funcionalidades de autenticação, gerenciamento de usuários, e integração com job boards.

**URL Base:** `http://localhost:5000/api`

## Índice

- [Autenticação](#autenticação)
  - [Fluxo de Autenticação](#fluxo-de-autenticação)
  - [Tokens e Segurança](#tokens-e-segurança)
- [Endpoints](#endpoints)
  - [Autenticação](#endpoints-de-autenticação)
  - [Usuários](#endpoints-de-usuários)
  - [Candidatos](#endpoints-de-candidatos)
  - [Vagas](#endpoints-de-vagas)
  - [Job Boards](#endpoints-de-job-boards)
  - [Filtros e Pesquisa](#endpoints-de-filtros-e-pesquisa)
  - [Dashboard](#endpoints-de-dashboard)
- [Objetos de Resposta](#objetos-de-resposta)
- [Códigos de Erro](#códigos-de-erro)
- [Paginação](#paginação)

## Autenticação

### Fluxo de Autenticação

1. **Login**: O cliente envia credenciais (email/senha) para obter tokens de acesso e refresh.
2. **Uso do Token**: O token de acesso é enviado no cabeçalho `Authorization` para acessar endpoints protegidos.
3. **Refresh de Token**: O token de refresh é usado para obter um novo token de acesso quando o atual expira.
4. **Logout**: Invalida o token atual.

### Tokens e Segurança

- **Token JWT**: Usado para autenticação em todas as requisições protegidas
- **CSRF Token**: Proteção contra ataques CSRF
- **Refresh Token**: Armazenado como cookie HTTP-Only para segurança
- **Expiração**: Token de acesso expira em 1 hora; Token de refresh expira em 7 dias

## Endpoints

### Endpoints de Autenticação

#### Login

```
POST /api/auth/login
```

Autentica um usuário e retorna tokens de acesso e refresh.

**Request Body**:
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "Nome do Usuário",
      "email": "usuario@exemplo.com",
      "role": "admin"
    }
  }
}
```

**Códigos de Status**:
- `200 OK`: Login bem-sucedido
- `401 Unauthorized`: Credenciais inválidas
- `400 Bad Request`: Dados de requisição inválidos

#### Refresh Token

```
POST /api/auth/refresh-token
```

Renova o token de acesso usando o refresh token.

**Request**: Não requer body. O refresh token deve estar presente como cookie HTTP-Only.

**Response**:
```json
{
  "success": true,
  "message": "Token renovado com sucesso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Códigos de Status**:
- `200 OK`: Token renovado com sucesso
- `401 Unauthorized`: Refresh token inválido ou expirado

#### Logout

```
POST /api/auth/logout
```

Invalida o token atual e o refresh token.

**Headers**:
- `Authorization: Bearer {token}`: Token de acesso válido

**Response**:
```json
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

**Códigos de Status**:
- `200 OK`: Logout bem-sucedido
- `401 Unauthorized`: Token inválido ou expirado

#### Obter Usuário Atual

```
GET /api/auth/me
```

Retorna os dados do usuário autenticado.

**Headers**:
- `Authorization: Bearer {token}`: Token de acesso válido

**Response**:
```json
{
  "success": true,
  "message": "Perfil obtido com sucesso",
  "data": {
    "id": 1,
    "name": "Nome do Usuário",
    "email": "usuario@exemplo.com",
    "role": "admin",
    "isActive": true,
    "permissions": {
      "canManageUsers": true,
      "canViewReports": true
    }
  }
}
```

**Códigos de Status**:
- `200 OK`: Dados obtidos com sucesso
- `401 Unauthorized`: Token inválido ou expirado

### Endpoints de Usuários

#### Listar Usuários

```
GET /api/users
```

Lista todos os usuários (somente para administradores).

**Headers**:
- `Authorization: Bearer {token}`: Token de acesso válido

**Response**:
```json
{
  "success": true,
  "message": "Usuários obtidos com sucesso",
  "data": [
    {
      "id": 1,
      "name": "Administrador",
      "email": "admin@example.com",
      "role": "admin",
      "isActive": true
    },
    {
      "id": 2,
      "name": "Gerente",
      "email": "manager@example.com",
      "role": "manager",
      "isActive": true
    }
  ]
}
```

**Códigos de Status**:
- `200 OK`: Lista obtida com sucesso
- `401 Unauthorized`: Token inválido ou expirado
- `403 Forbidden`: Usuário não tem permissão de administrador

#### Criar Usuário

```
POST /api/users
```

Cria um novo usuário (somente para administradores).

**Headers**:
- `Authorization: Bearer {token}`: Token de acesso válido

**Request Body**:
```json
{
  "name": "Novo Usuário",
  "email": "novo@exemplo.com",
  "password": "senha123",
  "role": "hr",
  "isActive": true,
  "clientId": 1,
  "permissions": {
    "canViewReports": true,
    "canEditClients": true
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Usuário criado com sucesso",
  "data": {
    "id": 3,
    "name": "Novo Usuário",
    "email": "novo@exemplo.com",
    "role": "hr",
    "isActive": true
  }
}
```

**Códigos de Status**:
- `201 Created`: Usuário criado com sucesso
- `400 Bad Request`: Dados inválidos
- `401 Unauthorized`: Token inválido ou expirado
- `403 Forbidden`: Usuário não tem permissão de administrador

#### Atualizar Usuário

```
PUT /api/users/:id
```

Atualiza um usuário existente (somente para administradores).

**Headers**:
- `Authorization: Bearer {token}`: Token de acesso válido

**Path Params**:
- `id`: ID do usuário a ser atualizado

**Request Body**:
```json
{
  "name": "Nome Atualizado",
  "role": "manager",
  "isActive": true,
  "permissions": {
    "canViewReports": true,
    "canEditClients": true
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Usuário atualizado com sucesso",
  "data": {
    "id": 2,
    "name": "Nome Atualizado",
    "email": "usuario@exemplo.com",
    "role": "manager",
    "isActive": true
  }
}
```

**Códigos de Status**:
- `200 OK`: Usuário atualizado com sucesso
- `400 Bad Request`: Dados inválidos
- `401 Unauthorized`: Token inválido ou expirado
- `403 Forbidden`: Usuário não tem permissão de administrador
- `404 Not Found`: Usuário não encontrado

#### Excluir Usuário

```
DELETE /api/users/:id
```

Exclui um usuário existente (somente para administradores).

**Headers**:
- `Authorization: Bearer {token}`: Token de acesso válido

**Path Params**:
- `id`: ID do usuário a ser excluído

**Response**:
```json
{
  "success": true,
  "message": "Usuário excluído com sucesso",
  "data": {
    "deleted": true,
    "id": 2
  }
}
```

**Códigos de Status**:
- `200 OK`: Usuário excluído com sucesso
- `401 Unauthorized`: Token inválido ou expirado
- `403 Forbidden`: Usuário não tem permissão de administrador
- `404 Not Found`: Usuário não encontrado

### Endpoints de Candidatos

#### Listar Candidatos

```
GET /api/candidates
```

Lista candidatos com suporte a filtros e paginação.

**Headers**:
- `Authorization: Bearer {token}`: Token de acesso válido

**Query Params**:
- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Itens por página (padrão: 10)
- `skill` (opcional): Filtrar por habilidade(s)
- `location` (opcional): Filtrar por localização
- `experience` (opcional): Filtrar por experiência mínima e máxima (formato: `[min,max]`)
- `availability` (opcional): Filtrar por disponibilidade
- `stage` (opcional): Filtrar por estágio no processo seletivo
- `search` (opcional): Pesquisa por nome, email ou posição

**Response**:
```json
{
  "success": true,
  "message": "Candidatos obtidos com sucesso",
  "data": [
    {
      "id": 1,
      "name": "Ana Silva",
      "email": "ana.silva@email.com",
      "phone": "+55 11 98765-4321",
      "location": "São Paulo, SP",
      "position": "Desenvolvedora Front-end",
      "experience": 4,
      "skills": ["React", "TypeScript", "CSS", "Jest"],
      "stage": "Entrevista",
      "score": 87
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 25,
    "itemsPerPage": 10
  }
}
```

**Códigos de Status**:
- `200 OK`: Lista obtida com sucesso
- `400 Bad Request`: Parâmetros de consulta inválidos
- `401 Unauthorized`: Token inválido ou expirado

#### Obter Candidato por ID

```
GET /api/candidates/:id
```

Obtém detalhes de um candidato específico.

**Headers**:
- `Authorization: Bearer {token}`: Token de acesso válido

**Path Params**:
- `id`: ID do candidato

**Response**:
```json
{
  "success": true,
  "message": "Candidato obtido com sucesso",
  "data": {
    "id": 1,
    "name": "Ana Silva",
    "email": "ana.silva@email.com",
    "phone": "+55 11 98765-4321",
    "location": "São Paulo, SP",
    "position": "Desenvolvedora Front-end",
    "experience": 4,
    "skills": ["React", "TypeScript", "CSS", "Jest"],
    "stage": "Entrevista",
    "score": 87,
    "availability": "immediate",
    "lastActivity": "2025-07-10T14:30:00Z",
    "notes": "Candidata com boa experiência em React e TypeScript."
  }
}
```

**Códigos de Status**:
- `200 OK`: Candidato obtido com sucesso
- `401 Unauthorized`: Token inválido ou expirado
- `404 Not Found`: Candidato não encontrado

#### Criar Candidato

```
POST /api/candidates
```

Cria um novo candidato.

**Headers**:
- `Authorization: Bearer {token}`: Token de acesso válido

**Request Body**:
```json
{
  "name": "Novo Candidato",
  "email": "candidato@exemplo.com",
  "phone": "+55 11 91234-5678",
  "location": "São Paulo, SP",
  "position": "Desenvolvedor Full Stack",
  "experience": 5,
  "skills": ["Node.js", "React", "TypeScript"],
  "stage": "Triagem",
  "availability": "immediate",
  "notes": "Candidato com perfil interessante para a vaga de desenvolvedor."
}
```

**Response**:
```json
{
  "success": true,
  "message": "Candidato criado com sucesso",
  "data": {
    "id": 6,
    "name": "Novo Candidato",
    "email": "candidato@exemplo.com",
    "phone": "+55 11 91234-5678",
    "location": "São Paulo, SP",
    "position": "Desenvolvedor Full Stack",
    "experience": 5,
    "skills": ["Node.js", "React", "TypeScript"],
    "stage": "Triagem",
    "availability": "immediate",
    "createdAt": "2025-08-05T20:45:00Z"
  }
}
```

**Códigos de Status**:
- `201 Created`: Candidato criado com sucesso
- `400 Bad Request`: Dados inválidos
- `401 Unauthorized`: Token inválido ou expirado

#### Atualizar Candidato

```
PUT /api/candidates/:id
```

Atualiza um candidato existente.

**Headers**:
- `Authorization: Bearer {token}`: Token de acesso válido

**Path Params**:
- `id`: ID do candidato

**Request Body**:
```json
{
  "stage": "Entrevista",
  "notes": "Candidato aprovado na triagem. Agendar entrevista.",
  "skills": ["Node.js", "React", "TypeScript", "PostgreSQL"]
}
```

**Response**:
```json
{
  "success": true,
  "message": "Candidato atualizado com sucesso",
  "data": {
    "id": 6,
    "name": "Novo Candidato",
    "email": "candidato@exemplo.com",
    "stage": "Entrevista",
    "skills": ["Node.js", "React", "TypeScript", "PostgreSQL"],
    "notes": "Candidato aprovado na triagem. Agendar entrevista.",
    "updatedAt": "2025-08-05T21:15:00Z"
  }
}
```

**Códigos de Status**:
- `200 OK`: Candidato atualizado com sucesso
- `400 Bad Request`: Dados inválidos
- `401 Unauthorized`: Token inválido ou expirado
- `404 Not Found`: Candidato não encontrado

#### Excluir Candidato

```
DELETE /api/candidates/:id
```

Exclui um candidato existente.

**Headers**:
- `Authorization: Bearer {token}`: Token de acesso válido

**Path Params**:
- `id`: ID do candidato

**Response**:
```json
{
  "success": true,
  "message": "Candidato excluído com sucesso",
  "data": {
    "deleted": true,
    "id": 6
  }
}
```

**Códigos de Status**:
- `200 OK`: Candidato excluído com sucesso
- `401 Unauthorized`: Token inválido ou expirado
- `403 Forbidden`: Usuário não tem permissão necessária
- `404 Not Found`: Candidato não encontrado

### Endpoints de Vagas

#### Listar Vagas

```
GET /api/job-postings
```

Lista vagas com suporte a filtros e paginação.

**Headers**:
- `Authorization: Bearer {token}`: Token de acesso válido

**Query Params**:
- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Itens por página (padrão: 10)
- `title` (opcional): Filtrar por título
- `location` (opcional): Filtrar por localização
- `status` (opcional): Filtrar por status (`DRAFT`, `OPEN`, `CLOSED`, `FILLED`)
- `skills` (opcional): Filtrar por habilidades requeridas
- `experienceLevel` (opcional): Filtrar por nível de experiência
- `remote` (opcional): Filtrar por trabalho remoto (boolean)
- `minSalary` (opcional): Filtrar por salário mínimo

**Response**:
```json
{
  "success": true,
  "message": "Vagas obtidas com sucesso",
  "data": [
    {
      "id": 1,
      "title": "Desenvolvedor Front-end React",
      "company": "TechCorp",
      "location": "São Paulo, SP",
      "status": "OPEN",
      "remote": true,
      "createdAt": "2025-07-01T10:00:00Z",
      "requiredSkills": ["React", "TypeScript", "CSS"],
      "applicantsCount": 12
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "totalItems": 15,
    "itemsPerPage": 10
  }
}
```

**Códigos de Status**:
- `200 OK`: Lista obtida com sucesso
- `400 Bad Request`: Parâmetros de consulta inválidos
- `401 Unauthorized`: Token inválido ou expirado

#### Obter Vaga por ID

```
GET /api/job-postings/:id
```

Obtém detalhes de uma vaga específica.

**Headers**:
- `Authorization: Bearer {token}`: Token de acesso válido

**Path Params**:
- `id`: ID da vaga

**Response**:
```json
{
  "success": true,
  "message": "Vaga obtida com sucesso",
  "data": {
    "id": 1,
    "title": "Desenvolvedor Front-end React",
    "description": "Estamos procurando um desenvolvedor front-end com experiência em React...",
    "company": "TechCorp",
    "location": "São Paulo, SP",
    "status": "OPEN",
    "remote": true,
    "requirements": "Experiência com React, TypeScript e testes unitários.",
    "responsibilities": "Desenvolver interfaces de usuário, implementar componentes reutilizáveis...",
    "benefits": "Plano de saúde, vale refeição, horário flexível...",
    "salary": {
      "min": 6000,
      "max": 10000,
      "currency": "BRL"
    },
    "experienceLevel": "Pleno",
    "requiredSkills": ["React", "TypeScript", "CSS", "Jest"],
    "createdAt": "2025-07-01T10:00:00Z",
    "publishedAt": "2025-07-02T14:30:00Z",
    "jobBoards": ["LOCAL", "LINKEDIN"]
  }
}
```

**Códigos de Status**:
- `200 OK`: Vaga obtida com sucesso
- `401 Unauthorized`: Token inválido ou expirado
- `404 Not Found`: Vaga não encontrada

#### Criar Vaga

```
POST /api/job-postings
```

Cria uma nova vaga.

**Headers**:
- `Authorization: Bearer {token}`: Token de acesso válido

**Request Body**:
```json
{
  "title": "Desenvolvedor Backend Node.js",
  "description": "Estamos procurando um desenvolvedor backend com experiência em Node.js...",
  "company": "TechCorp",
  "location": "Remote",
  "remote": true,
  "requirements": "Experiência com Node.js, Express e bancos de dados SQL.",
  "responsibilities": "Desenvolver APIs RESTful, implementar microsserviços...",
  "benefits": "Plano de saúde, vale refeição, horário flexível...",
  "salary": {
    "min": 7000,
    "max": 12000,
    "currency": "BRL"
  },
  "experienceLevel": "Pleno/Sênior",
  "requiredSkills": ["Node.js", "Express", "PostgreSQL", "TypeScript"],
  "status": "DRAFT"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Vaga criada com sucesso",
  "data": {
    "id": 3,
    "title": "Desenvolvedor Backend Node.js",
    "status": "DRAFT",
    "createdAt": "2025-08-05T20:45:00Z"
  }
}
```

**Códigos de Status**:
- `201 Created`: Vaga criada com sucesso
- `400 Bad Request`: Dados inválidos
- `401 Unauthorized`: Token inválido ou expirado

#### Atualizar Vaga

```
PUT /api/job-postings/:id
```

Atualiza uma vaga existente.

**Headers**:
- `Authorization: Bearer {token}`: Token de acesso válido

**Path Params**:
- `id`: ID da vaga

**Request Body**:
```json
{
  "title": "Desenvolvedor Backend Node.js (Atualizado)",
  "requirements": "Experiência com Node.js, Express, TypeScript e bancos de dados SQL.",
  "status": "OPEN"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Vaga atualizada com sucesso",
  "data": {
    "id": 3,
    "title": "Desenvolvedor Backend Node.js (Atualizado)",
    "status": "OPEN",
    "updatedAt": "2025-08-05T21:15:00Z"
  }
}
```

**Códigos de Status**:
- `200 OK`: Vaga atualizada com sucesso
- `400 Bad Request`: Dados inválidos
- `401 Unauthorized`: Token inválido ou expirado
- `404 Not Found`: Vaga não encontrada

#### Excluir Vaga

```
DELETE /api/job-postings/:id
```

Exclui uma vaga existente.

**Headers**:
- `Authorization: Bearer {token}`: Token de acesso válido

**Path Params**:
- `id`: ID da vaga

**Response**:
```json
{
  "success": true,
  "message": "Vaga excluída com sucesso",
  "data": {
    "deleted": true,
    "id": 3
  }
}
```

**Códigos de Status**:
- `200 OK`: Vaga excluída com sucesso
- `401 Unauthorized`: Token inválido ou expirado
- `404 Not Found`: Vaga não encontrada

#### Publicar Vaga em Job Board

```
POST /api/job-postings/:id/publish
```

Publica uma vaga em um job board.

**Headers**:
- `Authorization: Bearer {token}`: Token de acesso válido

**Path Params**:
- `id`: ID da vaga

**Request Body**:
```json
{
  "jobBoard": "LINKEDIN",
  "settings": {
    "featured": true,
    "durationDays": 30
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Vaga publicada com sucesso no LinkedIn",
  "data": {
    "jobId": 3,
    "jobBoard": "LINKEDIN",
    "publishedAt": "2025-08-05T21:30:00Z",
    "externalId": "linkedin-123456"
  }
}
```

**Códigos de Status**:
- `200 OK`: Vaga publicada com sucesso
- `400 Bad Request`: Dados inválidos ou vaga não pode ser publicada
- `401 Unauthorized`: Token inválido ou expirado
- `404 Not Found`: Vaga não encontrada

#### Remover Vaga de Job Board

```
DELETE /api/job-postings/:id/job-boards/:jobBoard
```

Remove uma vaga de um job board específico.

**Headers**:
- `Authorization: Bearer {token}`: Token de acesso válido

**Path Params**:
- `id`: ID da vaga
- `jobBoard`: Job board (ex: `LINKEDIN`, `INDEED`)

**Response**:
```json
{
  "success": true,
  "message": "Vaga removida com sucesso do LinkedIn",
  "data": {
    "jobId": 3,
    "jobBoard": "LINKEDIN",
    "removedAt": "2025-08-05T22:00:00Z"
  }
}
```

**Códigos de Status**:
- `200 OK`: Vaga removida com sucesso
- `401 Unauthorized`: Token inválido ou expirado
- `404 Not Found`: Vaga não encontrada ou não publicada no job board

### Outros Endpoints

O TalentTracker também oferece endpoints para gestão de:

- **Filtros e Pesquisa**: Endpoints para consultas avançadas e gerenciamento de filtros recentes
- **Dashboard**: Métricas e estatísticas para tomada de decisão
- **Competências**: Gerenciamento do catálogo de habilidades e competências
- **Clientes**: Gestão de empresas clientes (para uso em plataformas multi-tenant)

## Objetos de Resposta

### Resposta Padrão de Sucesso

Todas as respostas bem-sucedidas seguem esta estrutura:

```json
{
  "success": true,
  "message": "Mensagem descritiva",
  "data": { ... }
}
```

### Resposta Paginada

Respostas que retornam listas paginadas incluem informações de paginação:

```json
{
  "success": true,
  "message": "Mensagem descritiva",
  "data": [ ... ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalItems": 95,
    "itemsPerPage": 10
  }
}
```

### Resposta de Erro

Todas as respostas de erro seguem esta estrutura:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Mensagem descritiva",
    "details": "Detalhes adicionais (opcional)"
  }
}
```

## Códigos de Erro

| Código | Descrição |
|--------|-----------|
| `UNAUTHORIZED` | Autenticação ausente ou inválida |
| `FORBIDDEN` | Usuário não tem permissão |
| `NOT_FOUND` | Recurso não encontrado |
| `VALIDATION_ERROR` | Dados de requisição inválidos |
| `DUPLICATE_ENTRY` | Tentativa de criar recurso duplicado |
| `MISSING_REQUIRED_FIELD` | Campo obrigatório ausente |
| `INVALID_FORMAT` | Formato de dados inválido |
| `INTERNAL_SERVER_ERROR` | Erro interno do servidor |

## Paginação

Os endpoints que retornam listas suportam paginação através dos seguintes parâmetros:

- `page`: Número da página (começando em 1)
- `limit`: Quantidade de itens por página

A resposta inclui metadados de paginação:

```json
"pagination": {
  "currentPage": 2,
  "totalPages": 10,
  "totalItems": 95,
  "itemsPerPage": 10
}
```

---

## Versão da API

Esta documentação descreve a versão 1.0 da API do TalentTracker.

Para dúvidas ou suporte, contate a equipe de desenvolvimento.
