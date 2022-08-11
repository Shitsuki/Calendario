const { Client } = require('pg')

const dbcon = new Client({
    connectionString: 'postgres://scarfzjpugogls:3e1e5c74ebb6f46042255dbbec9a30f4be26d728d6405f05a1f06809369aba9a@ec2-44-195-100-240.compute-1.amazonaws.com:5432/d5kp2pu8pmp380',
    ssl: {
        rejectUnauthorized: false
    }
});

dbcon.connect(err => {
    if (err) {
        console.log("Não foi possível conectar ao banco.");
        console.log({ err });
    } else {
        console.log("Banco conectado com sucesso.");
    }
});

module.exports = {
    dbcon
}