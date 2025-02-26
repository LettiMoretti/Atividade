const repositorio = require("../Repository/awsRepository.js");

async function save(idUsuario, imagem) {
    try {
        return await repositorio.criarImagem( idUsuario, imagem );
    } catch ( error ) {
        console.error ("Erro ao criar imagem!");
        throw error;
    }
}

async function buscar(referencia) {
    try {
        return await repositorio.buscarImagem(referencia);
    } catch (error) {
        console.error('Erro ao buscar imagem:', error);
        throw error;
    }
}

module.exports = { save, buscar };