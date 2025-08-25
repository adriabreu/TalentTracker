#!/bin/bash

# 🚀 Script de Deploy Automatizado - TalentTracker
# Domínio: elevai.tec.br

set -e  # Parar em caso de erro

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Verificar se está rodando como root
if [[ $EUID -eq 0 ]]; then
   error "Este script não deve ser executado como root"
fi

log "🚀 Iniciando deploy do TalentTracker para elevai.tec.br"

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    error "Node.js não está instalado. Execute: curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs"
fi

# Verificar se o PM2 está instalado
if ! command -v pm2 &> /dev/null; then
    log "Instalando PM2..."
    sudo npm install -g pm2
fi

# Verificar se o arquivo .env existe
if [ ! -f .env ]; then
    error "Arquivo .env não encontrado. Crie o arquivo .env baseado no env.example"
fi

# Backup do banco antes do deploy
log "📦 Fazendo backup do banco de dados..."
if command -v pg_dump &> /dev/null; then
    mkdir -p backups
    BACKUP_FILE="backups/backup_$(date +%Y%m%d_%H%M%S).sql"
    pg_dump -h localhost -U talenttracker_user talenttracker > "$BACKUP_FILE" 2>/dev/null || warn "Não foi possível fazer backup do banco"
    log "Backup salvo em: $BACKUP_FILE"
fi

# Instalar dependências
log "📦 Instalando dependências..."
npm ci

# Build da aplicação
log "🔨 Fazendo build da aplicação..."
npm run build

# Verificar se o build foi bem-sucedido
if [ ! -d "client/dist" ]; then
    error "Build falhou - diretório client/dist não encontrado"
fi

# Parar aplicação se estiver rodando
if pm2 list | grep -q "talenttracker"; then
    log "⏹️ Parando aplicação atual..."
    pm2 stop talenttracker || true
fi

# Iniciar aplicação com PM2
log "▶️ Iniciando aplicação com PM2..."
pm2 start ecosystem.config.js

# Salvar configuração do PM2
pm2 save

# Verificar status
log "📊 Verificando status da aplicação..."
sleep 3
pm2 status

# Verificar se a aplicação está respondendo
log "🔍 Testando se a aplicação está respondendo..."
if curl -s http://localhost:3000/api/health > /dev/null; then
    log "✅ Aplicação está respondendo corretamente"
else
    warn "⚠️ Aplicação pode não estar respondendo. Verifique os logs: pm2 logs talenttracker"
fi

# Verificar logs
log "📋 Últimas linhas dos logs:"
pm2 logs talenttracker --lines 10 --nostream

log "🎉 Deploy concluído com sucesso!"
log "🌐 Acesse: https://elevai.tec.br"
log "📊 Monitoramento: pm2 monit"
log "📋 Logs: pm2 logs talenttracker" 