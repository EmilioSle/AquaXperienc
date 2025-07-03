// src/services/reservaService.ts
import { AppDataSource } from '../config/data-source';
import { Reserva } from '../models/reserva.model';
import { Repository } from 'typeorm';
import { IReserva } from '../interfaces/Ireserva';

export class ReservaService implements IReserva {
  private reservaRepo: Repository<Reserva>;

  constructor() {
    this.reservaRepo = AppDataSource.getRepository(Reserva);
  }

  async findAll(): Promise<Reserva[]> {
    return await this.reservaRepo.find({ relations: ['usuario', 'experiencia'] });
  }

  async findById(id: string): Promise<Reserva | null> {
    return await this.reservaRepo.findOne({ where: { id }, relations: ['usuario', 'experiencia'] });
  }

  async save(data: Reserva): Promise<Reserva> {
    return await this.reservaRepo.save(data);
  }

  async update(id: string, data: Reserva): Promise<Reserva> {
    const reserva = await this.reservaRepo.findOneBy({ id });
    if (!reserva) throw new Error('Reserva no encontrada');
    Object.assign(reserva, data);
    return await this.reservaRepo.save(reserva);
  }

  async delete(id: string): Promise<Reserva> {
    const reserva = await this.reservaRepo.findOneBy({ id });
    if (!reserva) throw new Error('Reserva no encontrada');
    await this.reservaRepo.remove(reserva);
    return reserva;
  }
}
