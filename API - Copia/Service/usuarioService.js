const repositorio=require("../Repository/usuarioRepository");

function save(nome) {
    const dataCriacao = new Date().toISOString().split('T')[0];
    repositorio.save(nome, dataCriacao);
}

function deletar(id) {
    repositorio.deletar(id);
}

function buscar(id) {
    return repositorio.buscar(id);
}

function atualizar(id, nome) {
    const dataCriacao = new Date().toISOString().split('T')[0];
    repositorio.atualizar(id, nome, dataCriacao);
}

module.exports = { save, deletar, buscar, atualizar };