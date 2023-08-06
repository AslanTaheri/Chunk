const { Pool } = require("pg");

const pool = new Pool();

// const db = {
//   query: (text, params) => pool.query(text, params),
// };

module.exports = pool;
