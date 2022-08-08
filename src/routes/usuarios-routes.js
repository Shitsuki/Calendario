const { Router } = require('express');

const { UsuariosController } = require('../controllers/usuarios-controller');

const routes = Router();

const usuarioController = new UsuariosController();

routes.get('/login', usuarioController.mostraLogin);

routes.get('/cadastro', usuarioController.mostraCadastro);

routes.post('/cadastro', usuarioController.cadastro);

module.exports = routes;