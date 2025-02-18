const repositorio = require("../Repository/imagemRepository.js");

function save(referencia, titulo) {
    const dataCriacao = new Date().toISOString().split('T')[0];
    repositorio.save(referencia, dataCriacao, titulo);
}

function deletar(id) {
    repositorio.deletar(id);
}

const buscar = async (id) => {
    // criar arquivo de config
    // importar aqui
    // utilizar os metodos do s3 para buscar imagem
    // fazer download
    const res = await repositorio.buscarPorId(id);
    console.log("Retorno Repositorio: ", res);
    return res;

}

function atualizar(id, referencia, titulo) {
    const dataCriacao = new Date().toISOString().split('T')[0];
    repositorio.atualizar(id, referencia, dataCriacao, titulo);
}

module.exports = { save, deletar, buscar, atualizar };