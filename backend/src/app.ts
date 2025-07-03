// src/app.ts

import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usuarioRoutes from './routes/usuario.routes';
import { AppDataSource } from './config/data-source';
import perfilInstructorRoutes from './routes/perfilInstructor.routes';
import experienciaRoutes from './routes/experiencia.routes';
import reservaRoutes from './routes/reserva.routes';
import equipoRoutes from './routes/equipo.routes';  
import alquilerRoutes from './routes/alquiler.routes';
import valoracionRoutes from './routes/valoracion.routes';
import disponibilidadRoutes from './routes/disponibilidad.routes';
import notificacionRoutes from './routes/notificacion.routes';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use('/api', usuarioRoutes);
app.use('/api', perfilInstructorRoutes);
app.use('/api', experienciaRoutes);
app.use('/api', reservaRoutes);
app.use('/api', equipoRoutes);
app.use('/api', alquilerRoutes);
app.use('/api', valoracionRoutes);
app.use('/api', disponibilidadRoutes);
app.use('/api', notificacionRoutes);
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
