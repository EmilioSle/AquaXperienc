// src/interfaces/Idisponibilidad.ts
import { Disponibilidad } from "../models/disponibilidad.model";

export interface IDisponibilidad {
  findAll(): Promise<Disponibilidad[]>;
  findById(id: string): Promise<Disponibilidad | null>;
  save(data: Disponibilidad): Promise<Disponibilidad>;
  update(id: string, data: Disponibilidad): Promise<Disponibilidad>;
  delete(id: string): Promise<Disponibilidad>;
}
