import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import carRoutes from './routes/routes.js';

app.use(express.json());

app.use('/api', carRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});