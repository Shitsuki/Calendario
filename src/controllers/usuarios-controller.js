const bcrypt = require('bcrypt');
const { Usuario, UsuarioDAO } = require('../models/usuario');

class UsuariosController {

    async mostraLogin(req, res) {
        return res.render('login', {});
    }
    async mostraCadastro(req, res) {
        return res.render('cadastro', {});
    }

    async login(req, res) {
        const { email, senha } = req.body;
        const usuarioEcontrado = await UsuarioDAO.emailsearch(email);
        const msg = {};
        msg.titulo = "Tente novamente";
        msg.mensagem = "Algo errado no login.";
        if (!usuarioEcontrado) {
            return res.render('login', { msg: msg });
        } else {
            const confere = bcrypt.compareSync(senha, usuarioEcontrado.senha);
            if (confere) {
                req.session.usuario = usuarioEcontrado;
                return res.redirect('verTimes');
            } else {
                return res.render('login', { msg: msg });
            }
        }
    }

    async cadastro(req, res) {
        const usuarioBody = req.body;
        let imagem = req.file.filename;
        const usuarioEcontrado = await UsuarioDAO.emailsearch(usuarioBody.email);
        if (usuarioEcontrado) {
            const msg = {};
            msg.titulo = "E-mail sendo usado";
            msg.mensagem = "Este e-mail já está sendo usado";
            return res.render('login', { msg: msg });
        } else {
            const senha = bcrypt.hashSync(usuarioBody.senha, 10);
            const usuario = new Usuario( usuarioBody.email, usuarioBody.nome, senha, imagem);
            await UsuarioDAO.cadastrar(usuario);
            req.session.usuario = usuario;
            return res.redirect('verTimes');
        }




        /*
        const { nome, email, senha } = req.body;
       
 
        const usuarioEncontrado = await UsuarioDAO.buscaPeloEmail(email);

        if (usuarioEncontrado) {
            return res.render('erro', { erro: 'E-mail em uso' });
        } else {

        const usuario = new Usuario(null, nome, email, senha, imagem);
        await UsuarioDAO.cadastrar(usuario);

        req.session.usuario = usuario;
        return res.redirect('/empresas/opcoes');*/
    }
}

module.exports = { UsuariosController };