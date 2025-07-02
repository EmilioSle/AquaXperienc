// src/data-source.ts

import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Usuario } from '../models/usuario.model';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres', 
  url: process.env.DB_URL, 
  ssl: {
    rejectUnauthorized: false, 
  },
  entities: [Usuario], 
  synchronize: process.env.DB_SYNCHRONIZE === 'true', 
  logging: true, 
});
