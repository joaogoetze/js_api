import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello World");
});

import pool from './db.js';


router.get('/getCars', (req, res) =>{
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
});


export default router;