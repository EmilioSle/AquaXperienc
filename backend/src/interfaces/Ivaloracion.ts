// src/interfaces/Ivaloracion.ts
import { Valoracion } from "../models/valoracion.model";

export interface IValoracion {
  findAll(): Promise<Valoracion[]>;
  findById(id: string): Promise<Valoracion | null>;
  save(data: Valoracion): Promise<Valoracion>;
  update(id: string, data: Valoracion): Promise<Valoracion>;
  delete(id: string): Promise<Valoracion>;
}
