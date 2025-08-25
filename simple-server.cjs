#!/usr/bin/env node

const { exec } = require("child_process");
const path = require("path");

// Caminho para o build do frontend
const distPath = path.join(__dirname, "dist/public");

// Comando para iniciar o servidor estático usando serve
const serveCmd = `npx serve ${distPath} -p 5173 -s`;

console.log(`[FRONTEND] Iniciando servidor na porta 5173...`);
console.log(`[FRONTEND] Servindo arquivos de ${distPath}`);

// Executa o comando
exec(serveCmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro ao iniciar servidor: ${error.message}`);
    return;
  }
  
  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }
  
  console.log(`stdout: ${stdout}`);
});
