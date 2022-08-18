const bcrypt = require('bcrypt');
const { Team, TeamDAO } = require('../models/team');
const { TeamUserDAO, Usuario_team } = require('../models/team-usuario');
const { UsuarioDAO, Usuario } = require('../models/usuario');

class TeamController {

    async mostraCadastroTeam(req, res) {
        return res.render('cadasteam', {});
    }

    async cadastroTeam(req, res) {
        const teamBody = req.body;
        const times = await TeamDAO.getTimes();
        try{
            const team = new Team(teamBody.nome, teamBody.descricao, req.session.usuario.email); 
            const result = await TeamDAO.cadastrar(team);
            const usuario = await UsuarioDAO.emailsearch(req.session.usuario.email);
        if (usuario) {
            await TeamUserDAO.cadastrarMembroGrupo(req.session.usuario.email, result.rows[0].id);
        }} catch(error){
            console.log(error)
        }
        return res.render('verTimes', {times});

    }
    
    async mostraTimes(req, res) {
        const email = req.session.usuario.email;
        const times = await TeamDAO.getTimesUser(email);

        return res.render('verTimes', {times});
    }

    async mostraMembrosPorTime(req, res){
        let id= req.params.id;
        let membros = await TeamDAO.getMembrosDoGrupo(id);
        return res.render('mostraMembros', {membros});
    }

    async mostraAddMembro(req, res) {
        return res.render('adicionarMembro');
    }

    async addmembro(req, res) {
        const { id } = req.params;
        const { email } = req.body;
        const time = await TeamDAO.idsearch(id);
        const msg = {};
        if (time) {            
            const usuario = await UsuarioDAO.emailsearch(email);
            if (usuario) {
                const usuarioTeam = await TeamUserDAO.idsearch(id, email);
                if (usuarioTeam) {
                    msg.titulo = "Usuário já inserido no grupo";
                    msg.mensagem = "Ops, este usuário já é membro do grupo!";
                    return res.render('adicionarMembro');
                } else {
                    TeamUserDAO.cadastrarMembroGrupo(email, id);
                    res.redirect("times");
                }
            } else {
                msg.titulo = "Não foi encontrado esse usuario";
                msg.mensagem = "Este usuário não existe";
                console.log('shwarxa')
                return res.render('adicionarMembro');
            }

        } else {
            res.redirect("/grupos/cadastro");
        }
    }
}

module.exports = { TeamController };