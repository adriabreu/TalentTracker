#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Configurações do servidor
const PORT = process.env.PORT || 5173;
const STATIC_PATH = path.join(__dirname, 'dist/public');
const API_TARGET = 'http://localhost:3001';

// Tipos MIME comuns
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// Função para encaminhar requisição para a API
function proxyRequest(req, res) {
  const apiPath = req.url;
  console.log(`[PROXY] Encaminhando requisição para: ${API_TARGET}${apiPath}`);
  
  const apiUrl = new URL(API_TARGET + apiPath);
  
  const options = {
    hostname: apiUrl.hostname,
    port: apiUrl.port,
    path: apiUrl.pathname + apiUrl.search,
    method: req.method,
    headers: {
      ...req.headers,
      host: apiUrl.host
    }
  };
  
  const proxyReq = http.request(options, (proxyRes) => {
    // Copiar cabeçalhos da resposta
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    
    // Encaminhar corpo da resposta
    proxyRes.pipe(res);
  });
  
  // Encaminhar corpo da requisição
  req.pipe(proxyReq);
  
  // Tratar erros de proxy
  proxyReq.on('error', (error) => {
    console.error(`[PROXY] Erro ao encaminhar para API: ${error.message}`);
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end(`Erro de proxy: ${error.message}`);
  });
}

// Função para servir arquivos estáticos
function serveStatic(req, res) {
  // Normaliza o caminho da URL
  let urlPath = url.parse(req.url).pathname;
  
  // Se for a raiz ou um caminho sem extensão, servir index.html (para SPA)
  if (urlPath === '/' || !path.extname(urlPath)) {
    urlPath = '/index.html';
  }
  
  // Caminho completo do arquivo
  const filePath = path.join(STATIC_PATH, urlPath);
  
  // Verificar se o arquivo existe
  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (err) {
      // Para SPA, retornar index.html em vez de 404
      const indexPath = path.join(STATIC_PATH, 'index.html');
      fs.readFile(indexPath, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not Found');
          return;
        }
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
      return;
    }
    
    // Ler e servir o arquivo
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      
      const ext = path.extname(filePath);
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
}

// Criar o servidor
const server = http.createServer((req, res) => {
  // Encaminhar requisições /api para o backend
  if (req.url.startsWith('/api')) {
    proxyRequest(req, res);
  } else {
    // Servir arquivos estáticos para outras rotas
    serveStatic(req, res);
  }
});

// Iniciar o servidor
server.listen(PORT, () => {
  console.log(`[FRONTEND] Servidor HTTP puro rodando em http://localhost:${PORT}`);
  console.log(`[FRONTEND] Servindo arquivos de ${STATIC_PATH}`);
  console.log(`[FRONTEND] API proxy configurado para ${API_TARGET}`);
});
