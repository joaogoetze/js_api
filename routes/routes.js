import pool from '../api/db.js';
import express from 'express';
const router = express.Router();

// Rota padrão
router.get('/', (req, res) => {
    res.send("Hello World");
});

// Rota para criar
router.post('/createCar', (req, res) => {
    // Pega o parâmetro que veio no JSON da requisição
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

// Rota para ler
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

// Rota para ler por ID
router.get('/readCar/:car_id', (req, res) => {
    // Pega o parâmetro que veio no JSON da requisição
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

// Rota para atualizar
router.put('/updateCar/:car_id', (req, res) => {
    // Pega os parâmetros que vieram no JSON da requisição
    const { car_id } = req.params;
    const { car_name, marca } = req.body;

    // Verificar se o item existe, se existir, pega as informações dele
    pool.query('SELECT * FROM cars WHERE car_id = $1', [car_id], (db_err, db_res) => {
        if (db_err) 
        {
            console.error("Error: ", db_err);
            res.status(500).json({ error: 'Database error' });
        }
        if (db_res.rows.length === 0) 
        {
            res.status(404).json({ message: 'Car not found' });
            console.log(car_id);
        } 
        
        // Pega o nome  e marca do carro que está no banco
        const currentCarName = db_res.rows[0].car_name;
        const currentCarMarca = db_res.rows[0].marca;

        // Define qual dado será adicionado no banco, caso tenha um valor no primeiro parâmetro
        // ou seja, foi enviado um parâmetro na requisição esse será o valor a ser adicionado, 
        // caso não tenha sido enviado nenhum valor, o valor a ser adicionado, será o valor atual,
        // ou seja, o mesmo valor que já está no banco 
        const updatedCarName =  car_name || currentCarName;
        const updatedCarMarca = marca || currentCarMarca;

        pool.query('UPDATE cars SET car_name = $1, marca = $2 WHERE car_id = $3 RETURNING *', [updatedCarName, updatedCarMarca, car_id], (db_err, db_res) => {
            if(db_err)
            {
                console.error("Error: ", db_err);
                return res.status(500).json({erro: 'Error updating'});
            }
            res.json(db_res.rows[0]);
        });
    }); 
});

// Rota para deletar
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