#!/bin/bash

# Script para iniciar o servidor backend do TalentTracker com configurações corretas

# Verifica se o PostgreSQL está rodando
echo "🔍 Verificando se PostgreSQL está rodando..."
pg_isready -h localhost -p 5432
if [ $? -ne 0 ]; then
  echo "❌ PostgreSQL não está rodando! Por favor, inicie o PostgreSQL primeiro."
  exit 1
fi

# Verifica se alguém já está usando a porta 3001
echo "🔍 Verificando se a porta 3001 está disponível..."
lsof -i :3001 > /dev/null
if [ $? -eq 0 ]; then
  echo "⚠️ Porto 3001 já está em uso. Tentando encerrar o processo..."
  # Tenta encerrar o processo que está usando a porta 3001
  lsof -i :3001 -t | xargs kill -9 2>/dev/null
  sleep 2
fi

# Configura a conexão com o banco de dados se o arquivo .env não existir
if [ ! -f "server/.env" ]; then
  echo "🔧 Criando arquivo .env com configurações de banco de dados..."
  cat > server/.env << EOL
DATABASE_URL=postgres://User@localhost:5432/talenttracker
NODE_ENV=development
USE_DATABASE=true
EOL
fi

# Verifica se o banco de dados talenttracker existe
echo "🔍 Verificando banco de dados talenttracker..."
psql -h localhost -l | grep talenttracker > /dev/null
if [ $? -ne 0 ]; then
  echo "⚠️ Banco de dados talenttracker não encontrado. Por favor, verifique sua instalação PostgreSQL."
fi

# Verifica e cria usuário admin se necessário
echo "🔍 Verificando usuário admin..."
cd server
NODE_ENV=development npx tsx fixAdminPassword.ts

# Inicia o servidor
echo "🚀 Iniciando servidor TalentTracker..."
cd /Users/User/Downloads/TalentTracker/server && NODE_ENV=development USE_DATABASE=true npx tsx index.ts
