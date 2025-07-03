// src/interfaces/Iequipo.ts
import { Equipo } from "../models/equipo.model";

export interface IEquipo {
  findAll(): Promise<Equipo[]>;
  findById(id: string): Promise<Equipo | null>;
  save(data: Equipo): Promise<Equipo>;
  update(id: string, data: Equipo): Promise<Equipo>;
  delete(id: string): Promise<Equipo>;
}
