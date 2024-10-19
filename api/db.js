import pool_pkg from 'pg';
const { Pool } = pool_pkg;

import dotenv from 'dotenv';
dotenv.config({ path: './config/.env'});

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

export default pool;