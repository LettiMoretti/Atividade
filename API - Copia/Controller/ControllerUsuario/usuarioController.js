const imagemService=require("../../Service/usuarioService.js");

// Adicionar um usuário
const adicionarUsuario = async (req, res) => {
    try {
        const { nome, data_criacao } = req.body;
        
        await usuarioService.save(nome, data_criacao);
        res.status(201).json({Message: "Usuário salvo com sucesso!"});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Deletar um usuário
const removerUsuario = async (req, res) => {
    try {
        const usuario = await usuarioService.buscar(req.params.id);
        if (usuario) {
            await usuarioService.deletar(req.params.id);
            res.json({ message: 'Usuário deletado com sucesso!' });
        } else {
            res.status(404).json({ error: 'Usuário não encontrado!' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar usuário!' });
    }
};

// Buscar um usuário por Id
const buscarUsuario = async (req, res) => {
    try {
        const usuario = await usuarioService.buscar(req.params.id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado!' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário!' });
    }
};

// Atualizar um usuário por Id
const atualizarUsuario = async (req, res) => {
    try {
        const { nome } = req.body;
        const usuario = await usuarioService.buscar(req.params.id);
        if (usuario) {
            await usuarioService.atualizar(req.params.id, nome);
            res.json({ message: 'Usuário atualizado com sucesso!' });
        } else {
            res.status(404).json({ error: 'Usuário não encontrado!' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário!' });
    }
};

module.exports = { adicionarUsuario, removerUsuario, buscarUsuario, atualizarUsuario };