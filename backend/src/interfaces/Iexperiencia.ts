// src/interfaces/Iexperiencia.ts
import { Experiencia } from "../models/experiencia.model";

export interface IExperiencia {
  findAll(): Promise<Experiencia[]>;
  findById(id: string): Promise<Experiencia | null>;
  save(data: Experiencia): Promise<Experiencia>;
  update(id: string, data: Experiencia): Promise<Experiencia>;
  delete(id: string): Promise<Experiencia>;
}
