// src/interfaces/Inotificacion.ts
import { Notificacion } from "../models/notificacion.model";

export interface INotificacion {
  findAll(): Promise<Notificacion[]>;
  findById(id: string): Promise<Notificacion | null>;
  save(data: Notificacion): Promise<Notificacion>;
  update(id: string, data: Notificacion): Promise<Notificacion>;
  delete(id: string): Promise<Notificacion>;
}
