#!/bin/bash

# Script para iniciar o cliente frontend do TalentTracker

# Verifica se o servidor backend está rodando
echo "🔍 Verificando se o servidor backend está rodando..."
curl -s http://localhost:3001/health > /dev/null
if [ $? -ne 0 ]; then
  echo "⚠️ O servidor backend não parece estar rodando na porta 3001."
  echo "ℹ️ Recomendado iniciar o backend primeiro com ./start-server.sh"
  read -p "Deseja continuar mesmo assim? (s/N): " choice
  if [[ "$choice" != "s" && "$choice" != "S" ]]; then
    echo "❌ Abortando inicialização do frontend."
    exit 1
  fi
fi

# Verifica se alguém já está usando a porta 5173 (porta padrão do Vite)
echo "🔍 Verificando se a porta 5173 está disponível..."
lsof -i :5173 > /dev/null
if [ $? -eq 0 ]; then
  echo "⚠️ Porto 5173 já está em uso. Tentando encerrar o processo..."
  lsof -i :5173 -t | xargs kill -9 2>/dev/null
  sleep 2
fi

# Inicia o cliente frontend
echo "🚀 Iniciando cliente frontend do TalentTracker..."
cd /Users/User/Downloads/TalentTracker/client && npm run dev
