module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: { filename: "./data/comake.db3" },
    migrations: { directory: "./data/migrations" },
    seeds: { directory: "./data/seeds" },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "./data/comake.db3",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "./data/comake.db3",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
