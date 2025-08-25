/**
 * Servidor de produção simplificado para o TalentTracker
 * Implementação robusta para evitar erros de path-to-regexp
 */

const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const app = express();

// Configuração de portas
const PORT = process.env.PORT || 5173;
const API_PORT = process.env.API_PORT || 3001;
const API_HOST = process.env.API_HOST || 'localhost';

// Configuração de CORS
app.use(cors());

// Middleware para logs
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Função manual de proxy para evitar path-to-regexp
app.use('/api', (req, res) => {
  const apiPath = req.url;
  const apiOptions = {
    hostname: API_HOST,
    port: API_PORT,
    path: '/api' + apiPath,
    method: req.method,
    headers: req.headers
  };
  
  console.log(`[PROXY] Redirecionando ${req.method} /api${apiPath} para http://${API_HOST}:${API_PORT}/api${apiPath}`);
  
  // Remove headers que podem causar problemas
  delete apiOptions.headers.host;
  
  const apiReq = http.request(apiOptions, (apiRes) => {
    res.writeHead(apiRes.statusCode, apiRes.headers);
    apiRes.pipe(res);
    console.log(`[PROXY] Resposta: ${apiRes.statusCode}`);
  });
  
  apiReq.on('error', (err) => {
    console.error('[PROXY] Erro:', err);
    res.status(500).send('Erro de proxy ao conectar com backend');
  });
  
  // Se houver corpo na requisição, envie para o backend
  if (req.body) {
    apiReq.write(JSON.stringify(req.body));
  }
  
  // Finaliza a requisição para o backend
  req.pipe(apiReq);
});

// Servir arquivos estáticos do build
app.use(express.static(path.join(__dirname, 'dist/public')));

// Rota para health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'frontend' });
});

// Para todas as outras rotas, retornar o index.html (SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`[FRONTEND] Servidor frontend rodando na porta ${PORT}`);
  console.log(`[FRONTEND] Redirecionando requisições API para http://${API_HOST}:${API_PORT}`);
});
