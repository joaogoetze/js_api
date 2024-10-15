import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello World");
});

import pool from './db.js';

router.get('/readCars', (req, res) => {
    pool.query('SELECT * FROM cars', (db_err, db_res) => {
        if(db_err)
        {
            console.error("Error: ", db_err);
            res.json(db_err.rows);
        }
        else
        {
            console.log('Resultado:', db_res.rows);
            res.json(db_res.rows);
        }
    });
});

router.get('/readCar/:car_id', (req, res) => {
    const { car_id } = req.params;
    console.log(car_id);
    pool.query('SELECT * FROM cars WHERE car_id = $1', [car_id], (db_err, db_res) => {
        if (db_err) 
        {
            console.error("Error: ", db_err);
            res.status(500).json({ error: 'Database error' });
        } 
        else if (db_res.rows.length === 0) 
        {
            res.status(404).json({ message: 'Car not found' });
            console.log(car_id);
        } 
        else 
        {
            console.log('Resultado:', db_res.rows[0]);
            res.json(db_res.rows[0]);
        }
    });
});


router.post('/createCar', (req, res) => {
    const { car_name } = req.body;
    pool.query('INSERT INTO cars (car_name) VALUES ($1) RETURNING *', [car_name], (db_err, db_res) => {
        if(db_err)
        {
            console.error("Error: ", db_err);
            res.json(db_err.rows);
        }
        else
        {
            console.log('Resultado:', db_res.rows[0]);
            res.json(db_res.rows[0]);
        }
    });

});

router.delete('/deleteCar/:car_id', (req, res) => {
    const { car_id } = req.params;
    pool.query('DELETE FROM cars WHERE car_id = $1 RETURNING *', [car_id], (db_err, db_res) =>{
        if(db_err)
        {
            console.error("Error:", bd_err);
            res.status(500).json({error: 'Database error' });
        }
        else if (db_res.rows.lentgh === 0)
        {
            res.status(404).json({ message: 'Car not found'});
        }
        else
        {
            console.log('Car deleted:', db_res.rows[0]);
            res.json({message: 'Car deleted', deletedCar: db_res.rows[0] });
        }
    });
});


export default router;