// src/services/disponibilidadService.ts
import { AppDataSource } from '../config/data-source';
import { Disponibilidad } from '../models/disponibilidad.model';
import { Repository } from 'typeorm';
import { IDisponibilidad } from '../interfaces/Idisponibilidad';

export class DisponibilidadService implements IDisponibilidad {
  private disponibilidadRepo: Repository<Disponibilidad>;

  constructor() {
    this.disponibilidadRepo = AppDataSource.getRepository(Disponibilidad);
  }

  async findAll(): Promise<Disponibilidad[]> {
    return await this.disponibilidadRepo.find({ relations: ['instructor'] });
  }

  async findById(id: string): Promise<Disponibilidad | null> {
    return await this.disponibilidadRepo.findOne({ where: { id }, relations: ['instructor'] });
  }

  async save(data: Disponibilidad): Promise<Disponibilidad> {
    return await this.disponibilidadRepo.save(data);
  }

  async update(id: string, data: Disponibilidad): Promise<Disponibilidad> {
    const disponibilidad = await this.disponibilidadRepo.findOneBy({ id });
    if (!disponibilidad) throw new Error('Disponibilidad no encontrada');
    Object.assign(disponibilidad, data);
    return await this.disponibilidadRepo.save(disponibilidad);
  }

  async delete(id: string): Promise<Disponibilidad> {
    const disponibilidad = await this.disponibilidadRepo.findOneBy({ id });
    if (!disponibilidad) throw new Error('Disponibilidad no encontrada');
    await this.disponibilidadRepo.remove(disponibilidad);
    return disponibilidad;
  }
}
