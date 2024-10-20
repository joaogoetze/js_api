import pool_pkg from 'pg';
// Atribuir um pacote dessa forma, faz com que apenas uma parte de todo o pacote seja importada
// Nesse caso apenas a funcionalidade Pool do pacote pg é importada nessa constante
const { Pool } = pool_pkg;

import dotenv from 'dotenv';
dotenv.config({ path: './config/.env'});

// Cria uma instância Pool, com os dados do arquivo .env
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Disponibiliza a instância criada para outros módulos do projeto
export default pool;