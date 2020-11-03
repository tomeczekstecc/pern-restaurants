const { Pool } = require('pg');
const pool = new Pool({
  //te dane tak naprawdę nie są  potrzebne  - pg samo pobiereze z .env jeśli odpowiednio je nazwać PGUSER... itd
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_DATABASE,
  // password: process.env.DB_PASS,
  // port: 5433,
});
module.exports = {
  query: (text, params) => pool.query(text, params),
};
