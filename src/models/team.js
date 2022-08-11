const { dbcon } = require("../config/connection-db");

class Team {
    constructor(nome, descricao, responsavel) {
        this.nome = nome;
        this.descricao = descricao;
        this.responsavel = responsavel;
    }
}

class TeamDAO {

    static async cadastrar(team) {
        const sql = 'INSERT INTO TEAM (NOME, DESCRICAO, RESPONSAVEL) VALUES ($1, $2, $3) returning id';
        const values = [team.nome, team.descricao, team.responsavel];
      
        try {
            let result =await dbcon.query(sql, values);
        return result;
        } catch (error) {
            console.log({ error });
        }
    }

    static async getTimes(teams){
        const sql = 'SELECT *  FROM TEAM'; 
        let result =await dbcon.query(sql);
        return result.rows;
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

    static async idsearch(id) {
        const sql = 'SELECT * FROM TEAM WHERE ID = $1';
        const result = await dbcon.query(sql, [id]);
        if (result.rows[0]) {
            return new Team(result.rows[0].nome, result.rows[0].descricao, result.rows[0].responsavel);
        } else {
            return null;
        }
    }
    
}

module.exports = {
    Team,
    TeamDAO
};