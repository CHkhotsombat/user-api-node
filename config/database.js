const env = process.env

module.exports = {
  development: {
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    dialect: 'mysql',
    logging: true,
    migrationStorageTableName: 'migrations',
    define: {
      freezeTableName: true,
      timestamps: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
      underscored: true,
      timestamp: true,
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  test: {
    username: 'root',
    password: null,
    database: 'databaseTest',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'databaseProduction',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
}
