const mysql = require('mysql2');

// Criação da conexão
const connection = mysql.createConnection({
  host: 'localhost', // ou o endereço do seu servidor
  user: 'root', // seu usuário do MySQL
  password: '', // sua senha do MySQL
  database: 'db_iago', // o nome do banco de dados
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro de conexão: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados com o ID: ' + connection.threadId);
});

// Exportando a conexão para ser utilizada em outros arquivos
module.exports = connection;