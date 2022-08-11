const { Router } = require('express');
const { upload } = require("../config/multer-config");
const { UsuariosController } = require('../controllers/usuarios-controller');
const { TeamController } = require('../controllers/team-controller');

const routes = Router();

const usuarioController = new UsuariosController();
const teamController = new TeamController();

routes.post('/login', usuarioController.login);

routes.get('/login', usuarioController.mostraLogin);

routes.get('/cadastro', usuarioController.mostraCadastro);

routes.post('/cadastro', upload.single("imagem"), usuarioController.cadastro);

routes.get('/cadasteam', teamController.mostraCadastroTeam);

routes.get('/verTimes', teamController.mostraTimes);

routes.post('/cadasteam', teamController.cadastroTeam);

routes.get('/:id/membros', teamController.mostraMembrosPorTime);

routes.get('/:id/adicionarMembro', teamController.mostraAddMembro);

routes.post('/:id/adicionarMembro', teamController.addmembro);

module.exports = routes;