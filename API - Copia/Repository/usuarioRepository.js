const db = require("./conexao.js");

function save (nome, data_criacao) {
    const sql = 'INSERT INTO usuarios (nome, data_criacao) VALUES (?, ?)';

    db.execute(sql, [nome, data_criacao], (err, results) => {
        if (err) {
            console.error('Erro ao salvar o usuario!', err);
            return;
        }
        console.log('Usuario salvo com sucesso!', results);
    });
}

function update (id, nome, data_criacao) {
    const sql = 'UPDATE usuarios SET nome=?, data_criacao=? WHERE id=?';

    db.execute(sql, [nome, data_criacao, id], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar o usuario!', err);
            return;
        }
        console.log('Usuario atualizado com sucesso!', results);
    });
}

function findByPk (id) {
    const sql = 'SELECT * FROM usuarios WHERE id=?';

    db.execute(sql, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar a usuario!', err);
            return;
        }
        console.log(results);
    });
}

function deletar (id) {
    const sql = 'DELETE FROM usuarios WHERE id=?';

    db.execute(sql, [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar o usuario!', err);
            return;
        }
        console.log('Usuario deletado com sucesso!');
    });
}

module.exports = { save, update, findByPk, deletar };