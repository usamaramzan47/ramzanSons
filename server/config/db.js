const { Pool } = require('pg');

const pool = new Pool({
    database: 'ramzanSons',
    userName : "postgres",
    password : "3gc7@LZW",
    port: 5432,
});

module.exports = pool;

// poolConfig.connectionString = `postgres://${userName}:${password}@localhost:5432/${Database}`;

// const client = new Pool(poolConfig);

