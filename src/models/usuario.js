const { dbcon } = require("../config/connection-db");

class Usuario {
    constructor(email, nome, senha, profile) {
        this.email = email;
        this.nome = nome;
        this.senha = senha;
        this.profile = profile;
    }
}

class UsuarioDAO {

    static async emailsearch(email) {
        const sql = 'SELECT * FROM USUARIO WHERE EMAIL = $1';
        const result = await dbcon.query(sql, [email]);
        if (result.rows[0]) {
            return new Usuario(result.rows[0].email, result.rows[0].nome, result.rows[0].senha, result.rows[0].profile);
        } else {
            return null;
        }
    }

    static async cadastrar(usuario) {

        const sql = 'INSERT INTO USUARIO (EMAIL, NOME, SENHA, PROFILE) VALUES ($1, $2, $3, $4);';
        const values = [usuario.email, usuario.nome, usuario.senha, usuario.profile];

        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log({ error });
        }
    }
}

module.exports = {
    Usuario,
    UsuarioDAO
};