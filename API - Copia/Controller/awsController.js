const awsService=require("../Service/awsService.js");

// Adicionar imagem
const adicionarImagem = async (req, res) => {
    try {
        const { referencia, titulo } = req.body;

        await imagemService.save(referencia, titulo);
        res.status(201).json({Message: "Imagem salva com sucesso!"});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

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



module.exports = { adicionarImagem, buscarImagem };