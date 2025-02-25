const awsService=require("../Service/awsService.js");

// Adicionar imagem
const adicionarImagem = async (req, res) => {
    try {
        const { idUsuario } = req.body;

        await awsService.save(idUsuario);
        res.status(201).json({Message: "Imagem salva com sucesso!"});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Buscar uma imagem por Id
const buscarImagem = async (req, res) => {
    try {
        const { referencia } = req.params;  // Pegando a referência da imagem da URL

        const imagem = await awsService.buscar(referencia);  // Buscar imagem do S3
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