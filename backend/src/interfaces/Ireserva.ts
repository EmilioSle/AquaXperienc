// src/interfaces/Ireserva.ts
import { Reserva } from "../models/reserva.model";

export interface IReserva {
  findAll(): Promise<Reserva[]>;
  findById(id: string): Promise<Reserva | null>;
  save(data: Reserva): Promise<Reserva>;
  update(id: string, data: Reserva): Promise<Reserva>;
  delete(id: string): Promise<Reserva>;
}
