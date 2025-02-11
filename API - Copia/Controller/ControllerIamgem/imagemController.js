const imagemService=require("../../Service/imagemService.js");

// Adicionar uma imagem
const adicionarImagem = async (req, res) => {
    try {
        const { referencia, titulo } = req.body;

        await imagemService.save(referencia, titulo);
        res.status(201).json({Message: "Imagem salva com sucesso!"});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

 // Deletar uma imagem
 const removerImagem = async (req, res) => {
    try {
        const imagem = await imagemService.buscar(req.params.id);

        if (imagem) {
            await imagemService.deletar(req.params.id);
            res.json({ message: 'Imagem deletada com sucesso!' });
        } else {
            res.status(404).json({ error: 'Imagem não encontrada!' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar imagem!' });
    }
};

// Buscar uma imagem por Id
const buscarImagem = async (req, res) => {
    try {
        const imagem = await imagemService.buscar(req.params.id);
        if (imagem) {
            res.json(imagem);
        } else {
            res.status(404).json({ error: 'Imagem não encontrada!' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar imagem!' });
    }
};

// Atualizar uma imagem por Id
const atualizarImagem = async (req, res) => {
    try {
        const { referencia, titulo } = req.body;
        const imagem = await imagemService.buscar(req.params.id);
        if (imagem) {
            await imagemService.atualizar(req.params.id, referencia, titulo);
            res.json({ message: 'Imagem atualizada com sucesso!' });
        } else {
            res.status(404).json({ error: 'Imagem não encontrada!' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar imagem!' });
    }
};

module.exports = { adicionarImagem, removerImagem, buscarImagem, atualizarImagem };