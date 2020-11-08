const { Pool } = require('pg');
const pool = new Pool({
  //te dane tak naprawdę nie są  potrzebne  - pg samo pobiereze z .env jeśli odpowiednio je nazwać PGUSER... itd
  // user: process.env.PGUSER,
  // host: process.env.PGHOST,
  // database: process.env.PGDATABASE,
  // password: process.env.PGPASSWORD,
  // port: process.env.PGPORT,
});
module.exports = {
  query: (text, params) => pool.query(text, params),
};
