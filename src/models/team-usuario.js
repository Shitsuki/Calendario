const { dbcon } = require("../config/connection-db");

class Usuario_team {
    constructor(user_email, team_id) {
        this.user_email = user_email;
        this.team_id = team_id;
    }
}

class TeamUserDAO {

    static async idsearch(id, email) {
        const sql = 'SELECT * FROM USUARIO_TEAM WHERE TEAM_ID = $1 AND USER_EMAIL = $2';
        const result = await dbcon.query(sql, [id, email]);
        if (result.rows[0]) {
            const usuarioTime = new TeamUserDAO(result.rows[0].user_email, result.rows[0].team_id);
            return usuarioTime;
        } else {
            return null;
        }
    }


    static async cadastrarMembroGrupo(email, id){
        try{
            const sql = "INSERT INTO USUARIO_TEAM (USER_EMAIL, TEAM_ID) VALUES ($1, $2);"
            let result = await dbcon.query(sql, [email, id]);
            return result;
        } catch(error){
            console.log(error)
        }
        
        

    }


    static async getMembrosDoGrupo(grupo){
        const sql = 'SELECT usuario.nome FROM TEAM join usuario_team on usuario_team.team_id = team.id join usuario on usuario_team.user_email = usuario.email where team.id = $1';
        const result = await dbcon.query(sql, [grupo]);
        let membros= [];
        for (let i = 0; i < result.rows.length; i++) {
          membros.push(result.rows[i]);
        }
        return membros;
    }
    
}

module.exports = {
    Usuario_team,
    TeamUserDAO
};