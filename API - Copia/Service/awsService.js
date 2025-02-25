const repositorio = require("../Repository/awsRepository.js");

async function save(idUsuario) {
    try {
        return await repositorio.criarImagem( idUsuario );
    } catch ( error ) {
        console.error ("Erro ao criar imagem!");
        throw error;
    }
}

async function buscar(referencia) {
    return repositorio.buscarImagem(referencia);
}

module.exports = { save, buscar };