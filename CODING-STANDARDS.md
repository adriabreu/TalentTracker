# Padrões de Codificação - TalentTracker

Este documento define os padrões de codificação a serem seguidos no projeto TalentTracker para garantir consistência e manutenibilidade do código.

## Importações

### Backend (Node.js/Express)

Para garantir consistência com o formato ESM adotado no backend:

1. **Use extensões de arquivo nos imports**:
   ```javascript
   // Correto
   import { logger } from './utils/logger.js';
   
   // Incorreto
   import { logger } from './utils/logger';
   ```

2. **Preferência por importações nomeadas**:
   ```javascript
   // Preferido
   import { Router } from 'express';
   import { authController } from './controllers/auth.controller.js';
   
   // Evitar quando possível
   import express from 'express';
   ```

3. **Ordem das importações**:
   - Pacotes externos (ordem alfabética)
   - Utilitários internos
   - Componentes/Módulos
   - Tipos (TypeScript)

   ```javascript
   // Exemplo de ordenação
   import { Router } from 'express';
   import { StatusCodes } from 'http-status-codes';
   
   import { logger } from '../utils/logger.js';
   
   import { User } from '../models/User.js';
   
   import type { UserType } from '../types/user.types.js';
   ```

### Frontend (React)

1. **Importações absolutas para componentes e utilitários**:
   ```typescript
   // Preferido
   import { Button } from '@/components/ui/button';
   
   // Evitar quando possível para componentes/páginas
   import { Button } from '../../components/ui/button';
   ```

2. **Importações relativas para arquivos no mesmo diretório**:
   ```typescript
   import { formatDate } from './utils';
   ```

3. **Separação por grupos com linha em branco**:
   ```typescript
   // Bibliotecas React/externas
   import { useState, useEffect } from 'react';
   import { useQuery } from '@tanstack/react-query';
   
   // Componentes, hooks e utilitários internos
   import { Button } from '@/components/ui/button';
   import { useAuth } from '@/hooks/useAuth';
   
   // Tipos e interfaces
   import type { User } from '@/types';
   ```

## Nomenclatura

1. **Arquivos**:
   - Componentes React: PascalCase (ex: `UserProfile.tsx`)
   - Módulos, utilitários: camelCase (ex: `authService.ts`)
   - Constantes/Enums: UPPER_SNAKE_CASE (ex: `ACTION_TYPES.ts`)

2. **Variáveis e Funções**: camelCase
   ```javascript
   const getUserData = () => { ... }
   ```

3. **Componentes e Classes**: PascalCase
   ```typescript
   function UserCard() { ... }
   class ApiService { ... }
   ```

4. **Interfaces e Types (TypeScript)**: PascalCase com prefixo I para interfaces (opcional)
   ```typescript
   interface IUser { ... }
   type UserRole = 'admin' | 'user';
   ```

## Formatação

1. **Indentação**: 2 espaços
2. **Ponto e vírgula**: Opcional, mas use de forma consistente
3. **Chaves**: Na mesma linha da declaração
4. **Comprimento máximo de linha**: 100 caracteres

## Comentários

1. **Evite comentários óbvios**
2. **Use JSDoc para documentar funções complexas**
3. **Mantenha o código limpo ao invés de comentar código não utilizado**

## Estrutura de Diretórios

### Backend
```
server/
├── src/
│   ├── controllers/     # Controladores das rotas
│   ├── middlewares/     # Middlewares Express
│   ├── models/          # Modelos e schemas
│   ├── routes/          # Definições de rotas
│   ├── services/        # Lógica de negócios
│   └── utils/           # Utilitários gerais
└── tests/               # Testes
```

### Frontend
```
client/
├── src/
│   ├── components/      # Componentes React reutilizáveis
│   ├── hooks/           # Hooks personalizados
│   ├── pages/           # Páginas/Rotas
│   ├── services/        # Serviços de API
│   ├── store/           # Gerenciamento de estado
│   ├── types/           # Definições de tipos
│   └── utils/           # Utilitários
└── __tests__/           # Testes
```

## Commits

1. **Mensagens descritivas** que explicam o que e por que (não como)
2. **Prefixos convencionais**:
   - `feat:` Nova funcionalidade
   - `fix:` Correção de bug
   - `refactor:` Refatoração sem mudanças funcionais
   - `docs:` Alterações na documentação
   - `style:` Mudanças de formatação, não de lógica
   - `test:` Adição/modificação de testes
   - `chore:` Tarefas de build, ferramentas, etc.

---

Estes padrões devem ser seguidos em todo o novo código e aplicados gradualmente ao código existente durante refatorações.
