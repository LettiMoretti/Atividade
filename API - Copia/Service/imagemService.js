const repositorio = require("../Repository/imagemRepository.js");

function save(referencia, titulo) {
    const dataCriacao = new Date().toISOString().split('T')[0];
    repositorio.save(referencia, dataCriacao, titulo);
}

function deletar(id) {
    repositorio.deletar(id);
}

function buscar(id) {
    return repositorio.buscar(id);
}

function atualizar(id, referencia, titulo) {
    const dataCriacao = new Date().toISOString().split('T')[0];
    repositorio.atualizar(id, referencia, dataCriacao, titulo);
}

module.exports = { save, deletar, buscar, atualizar };