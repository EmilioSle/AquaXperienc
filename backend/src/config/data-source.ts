// src/data-source.ts

import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Usuario } from '../models/usuario.model';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Configuración de la conexión a la base de datos
export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Usuario],
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: true,
});
