const awsService=require("../Service/awsService.js");

// Buscar uma imagem por Id
const buscarImagem = async (req, res) => {
    try {
        const imagem = await awsService.buscar(req.params.id);
        if (imagem) {
            res.json(imagem);
        } else {
            res.status(404).json({ error: 'Imagem não encontrada!' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar imagem!' });
    }
};

module.exports = { buscarImagem };