module.exports = {
    type: 'postgres',
    username:  process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    entities: [
        `${__dirname}/src/entities/**/*.entity.ts`
    ],
    migrations: [`${__dirname}/src/migrations/**/*.ts`],
    cli: {
        migrationsDir: 'src/migrations',
    }
};
