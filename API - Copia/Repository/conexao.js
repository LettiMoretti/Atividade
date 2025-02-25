const mysql = require('mysql2');

// Criação da conexão
const connection = mysql.createConnection({
  host: 'localhost', // endereço do seu servidor
  user: 'root', // usuário do MySQL
  password: '', // senha do MySQL
  database: 'db_iago', // nome do banco de dados
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro de conexão: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados com o ID: ' + connection.threadId);
});

module.exports = connection;