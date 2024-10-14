import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import carRoutes from './routes.js';

app.use(express.json());

app.use('/api', carRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




import pool from './db.js';

pool.query('SELECT * FROM cars', (err, res) => {
    if(err)
    {
        console.error("Error: ", err);
    }
    else
    {
        console.log('Resultado:', res.rows);
    }
});