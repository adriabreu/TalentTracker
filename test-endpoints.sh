#!/bin/bash

echo "🧪 TESTE DOS ENDPOINTS - TALENTTRACKER"
echo "======================================"

# Configurações
BASE_URL="http://localhost:3000"
AUTH_HEADER="Authorization: Bearer mock-token"
CONTENT_TYPE="Content-Type: application/json"

# Função para testar endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    
    echo "🔍 Testando: $method $endpoint"
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "%{http_code}" -X GET "$BASE_URL$endpoint" -H "$AUTH_HEADER" -H "$CONTENT_TYPE")
    elif [ "$method" = "POST" ]; then
        response=$(curl -s -w "%{http_code}" -X POST "$BASE_URL$endpoint" -H "$AUTH_HEADER" -H "$CONTENT_TYPE" -d "$data")
    elif [ "$method" = "PATCH" ]; then
        response=$(curl -s -w "%{http_code}" -X PATCH "$BASE_URL$endpoint" -H "$AUTH_HEADER" -H "$CONTENT_TYPE" -d "$data")
    fi
    
    http_code="${response: -3}"
    body="${response%???}"
    
    if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
        echo "✅ Sucesso ($http_code): $endpoint"
        echo "📄 Resposta: $body" | head -c 100
        echo "..."
    else
        echo "❌ Erro ($http_code): $endpoint"
        echo "📄 Resposta: $body"
    fi
    echo ""
}

echo "🚀 Iniciando testes..."
echo ""

# Teste 1: Endpoints básicos (já funcionando)
echo "📋 TESTE 1: ENDPOINTS BÁSICOS"
test_endpoint "GET" "/api/clients"
test_endpoint "GET" "/api/competencies"
test_endpoint "GET" "/api/tracks"
test_endpoint "GET" "/api/collaborators"

# Teste 2: Novos endpoints - Prioridades Médias
echo "📋 TESTE 2: PRIORIDADES MÉDIAS"
test_endpoint "GET" "/api/system-settings"
test_endpoint "GET" "/api/training-courses"
test_endpoint "GET" "/api/job-levels"

# Teste 3: Novos endpoints - Prioridades Baixas
echo "📋 TESTE 3: PRIORIDADES BAIXAS"
test_endpoint "GET" "/api/kanban-boards"
test_endpoint "GET" "/api/advanced-reports"
test_endpoint "GET" "/api/integrations"
test_endpoint "GET" "/api/notifications"
test_endpoint "GET" "/api/advanced-backups"

# Teste 4: Criação de dados
echo "📋 TESTE 4: CRIAÇÃO DE DADOS"
test_endpoint "POST" "/api/kanban-boards" '{"name":"Projeto Teste","type":"project","clientId":1}'
test_endpoint "POST" "/api/advanced-reports" '{"name":"Relatório Teste","type":"dashboard","category":"hr","clientId":1}'
test_endpoint "POST" "/api/integrations" '{"name":"Integração Teste","type":"lms","provider":"moodle","clientId":1}'

echo "🎉 Testes concluídos!"
echo ""
echo "📊 RESUMO:"
echo "- Endpoints testados: 15"
echo "- Status: Verificar resultados acima"
echo ""
echo "💡 Para ver detalhes completos, execute:"
echo "curl -X GET 'http://localhost:3000/api/health' -H 'Authorization: Bearer mock-token'" 