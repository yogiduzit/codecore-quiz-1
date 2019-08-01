// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "cluckr"
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./db/migrations"
    }
  }
};