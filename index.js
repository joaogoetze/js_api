import express from 'express';
import cors from 'cors';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import carRoutes from './routes/routes.js';

app.use(express.json());

app.use(cors());

app.use('/api', carRoutes);

const PORT = 3200;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});