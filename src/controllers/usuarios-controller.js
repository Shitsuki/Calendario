const bcrypt = require('bcrypt');
const { Usuario, UsuarioDAO } = require('../models/usuario');

class UsuariosController {

    async mostraLogin(req, res) {
        return res.render('login', {});
    }
    async mostraCadastro(req, res) {
        return res.render('cadastro', {});
    }

    async cadastro(req, res) {
        const usuarioBody = req.body;
        const usuarioEcontrado = await UsuarioDAO.emailsearch(usuarioBody.email);
        if (usuarioEcontrado) {
            const msg = {};
            msg.titulo = "E-mail sendo usado";
            msg.mensagem = "Este e-mail já está sendo usado";
            return res.render('login', { msg: msg });
        } else {
            const senha = bcrypt.hashSync(usuarioBody.senha, 10);
            const usuario = new Usuario(usuarioBody.email, usuarioBody.nome, senha);
            await UsuarioDAO.cadastrar(usuario);
            req.session.usuario = usuario;
            return res.redirect('/');
        }
    }
}

module.exports = { UsuariosController };