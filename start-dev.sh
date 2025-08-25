#!/bin/bash

# Script para iniciar o servidor TalentTracker em modo desenvolvimento
echo "🚀 Iniciando TalentTracker (Metaforma)..."

# Configurar variáveis de ambiente
export GEMINI_API_KEY=AIzaSyDEkGBAc4hl7n4PiW4xdMs2dKPwZyr3qF4
export TAVILY_API_KEY=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
export JWT_SECRET=metaforma-jwt-secret-2024-development
export NODE_ENV=development

echo "✅ Variáveis de ambiente configuradas"
echo "🤖 Provedores de IA: Google Gemini, Tavily Search"
echo "💾 Armazenamento: MemStorage (sem banco de dados)"
echo "🌐 Servidor: http://localhost:3000"

# Iniciar o servidor
npm run dev 