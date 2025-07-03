// src/interfaces/Ialquiler.ts
import { Alquiler } from "../models/alquiler.model";

export interface IAlquiler {
  findAll(): Promise<Alquiler[]>;
  findById(id: string): Promise<Alquiler | null>;
  save(data: Alquiler): Promise<Alquiler>;
  update(id: string, data: Alquiler): Promise<Alquiler>;
  delete(id: string): Promise<Alquiler>;
}
