import express from 'express';
const app = express();

import dotevn from 'dotenv';
dotevn.config();

app.use(express.json());

const PORT = process.env.DB_PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});