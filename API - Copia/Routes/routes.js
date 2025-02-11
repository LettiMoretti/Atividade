const express = require('express');
const usuarioController = require('../Controller/ControllerUsuario/usuarioController.js');
const imagemController = require('../Controller/ControllerIamgem/imagemController.js');
const router = express.Router();

//Usuário
// Adicionar
router.post('/usuarios', usuarioController.adicionarUsuario);
// Deletar
router.delete('/usuarios/:id', usuarioController.removerUsuario);
// Buscar
router.get('/usuarios/:id', usuarioController.buscarUsuario);
// Editar
router.put('/usuarios/:id', usuarioController.atualizarUsuario);

// Imagem
// Adicionar
router.post('/imagens', imagemController.adicionarImagem);
// Deletar
router.delete('/imagens/:id', imagemController.removerImagem);
// Buscar
router.get('/imagens/:id', imagemController.buscarImagem);
// Editar
router.put('/imagens/:id', imagemController.atualizarImagem);

module.exports = router;