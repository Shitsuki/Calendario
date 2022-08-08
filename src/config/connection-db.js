const { Client } = require('pg')

const dbcon = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123',
    port: 5432,
})

dbcon.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = { dbcon };