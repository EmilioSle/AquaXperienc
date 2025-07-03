// src/interfaces/IperfilInstructor.ts
import { PerfilInstructor } from "../models/perfil_instructor.model";

export interface IPerfilInstructor {
  findAll(): Promise<PerfilInstructor[]>;
  findById(id: string): Promise<PerfilInstructor | null>;
  save(perfil: PerfilInstructor): Promise<PerfilInstructor>;
  update(id: string, perfil: PerfilInstructor): Promise<PerfilInstructor>;
  delete(id: string): Promise<PerfilInstructor>;
}
