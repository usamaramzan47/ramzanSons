const { Pool } = require('pg');

const pool = new Pool({
    user : "postgres",
    host: 'localhost',
    database: 'ramzanSons',
    password : "3gc7@LZW",
    port: 5432,
});

module.exports = pool;

