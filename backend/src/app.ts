// src/app.ts

import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usuarioRoutes from './routes/usuario.routes';
import { AppDataSource } from './config/data-source';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use('/api', usuarioRoutes);

// Inicializar la base de datos
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization', error);
  });
