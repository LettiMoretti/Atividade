const db = require("./conexao.js");

function save (referencia, data_criacao, titulo) {
    const sql = 'INSERT INTO imagens (referencia, data_criacao, titulo) VALUES (?, ?, ?)';

    db.execute(sql, [referencia, data_criacao, titulo], (err, results) => {
        if (err) {
            console.error('Erro ao salvar a imagem!', err);
            return;
        }
        console.log('Imagem salva com sucesso!', results);
    });
}

function update (id, referencia, data_criacao, titulo) {
    const sql = 'UPDATE imagens SET referencia=?, data_criacao=?, titulo=? WHERE id=?';

    db.execute(sql, [referencia, data_criacao, titulo, id], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar a imagem!', err);
            return;
        }
        console.log('Imagem atualizada com sucesso!', results);
    });
}

function findByPk (id) {
    const sql = 'SELECT * FROM imagens WHERE id=?';

    db.execute(sql, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar a imagem!', err);
            return;
        }
        console.log(results);
    });
}

function deletar (id) {
    const sql = 'DELETE FROM imagens WHERE id=?';

    db.execute(sql, [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar a imagem!', err);
            return;
        }
        console.log('Imagem deletada com sucesso!');
    });
}

module.exports = { save, update, findByPk, deletar };