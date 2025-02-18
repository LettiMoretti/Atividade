const repositorio = require("../Repository/awsRepository.js");

function buscar(id) {
    return repositorio.buscar(id);
}

module.exports = { buscar };