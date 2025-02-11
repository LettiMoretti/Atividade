const express = require('express'); // Importar express
const routes = require('./Routes/routes.js');
const app = express(); // Utilizar express

app.use(express.json());
app.use(routes);

app.listen(3001, () => console.log("Servidor rodando na porta 3001."));