const repositorio = require("../Repository/awsRepository.js");

async function save(idUsuario) {
    try {
        return await repositorio.criarImagem( idUsuario );
    } catch ( error ) {
        console.error ("Erro ao criar imagem!");
        throw error;
    }
}

async function buscar(id) {
    return repositorio.buscar(id);
}

module.exports = { save, buscar };