const db = require("./conexao.js");

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


module.exports = { findByPk };