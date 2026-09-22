const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "sucre_alojamientos",
  user: "postgres",
  password: "postgres",
});

pool.on("error", (error) => {
  console.error("Error de PostgreSQL:", error);
});

module.exports = pool;
