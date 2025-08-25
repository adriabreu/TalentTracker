#!/usr/bin/env node

const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5173;

// Proxy manual para o backend usando módulo http nativo
app.use('/api', (req, res) => {
  console.log(`[PROXY] Encaminhando requisição para: http://localhost:3001${req.url}`);
  
  // Opções da requisição
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: req.url,
    method: req.method,
    headers: {
      ...req.headers,
      host: 'localhost:3001'
    }
  };
  
  const proxyReq = http.request(options, (proxyRes) => {
    // Copiar status e headers
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    
    // Encaminhar dados
    proxyRes.pipe(res);
  });
  
  // Encaminhar o corpo da requisição se houver
  req.pipe(proxyReq);
  
  // Tratar erros
  proxyReq.on('error', (error) => {
    console.error(`[PROXY] Erro: ${error.message}`);
    res.status(500).send('Erro no proxy');
  });
});

// Servir arquivos estáticos do build
const staticPath = path.join(__dirname, 'dist/public');
app.use(express.static(staticPath));

// Rotas não encontradas (para SPA - react-router)
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`[FRONTEND] Servidor rodando em http://localhost:${PORT}`);
  console.log(`[FRONTEND] Servindo arquivos de ${staticPath}`);
  console.log(`[FRONTEND] API proxy configurado para http://localhost:3001`);
});
