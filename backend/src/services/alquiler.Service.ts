// src/services/alquilerService.ts
import { AppDataSource } from '../config/data-source';
import { Alquiler } from '../models/alquiler.model';
import { Repository } from 'typeorm';
import { IAlquiler } from '../interfaces/Ialquiler';

export class AlquilerService implements IAlquiler {
  private alquilerRepo: Repository<Alquiler>;

  constructor() {
    this.alquilerRepo = AppDataSource.getRepository(Alquiler);
  }

  async findAll(): Promise<Alquiler[]> {
    return await this.alquilerRepo.find({ relations: ['usuario', 'equipo'] });
  }

  async findById(id: string): Promise<Alquiler | null> {
    return await this.alquilerRepo.findOne({ where: { id }, relations: ['usuario', 'equipo'] });
  }

  async save(data: Alquiler): Promise<Alquiler> {
    return await this.alquilerRepo.save(data);
  }

  async update(id: string, data: Alquiler): Promise<Alquiler> {
    const alquiler = await this.alquilerRepo.findOneBy({ id });
    if (!alquiler) throw new Error('Alquiler no encontrado');
    Object.assign(alquiler, data);
    return await this.alquilerRepo.save(alquiler);
  }

  async delete(id: string): Promise<Alquiler> {
    const alquiler = await this.alquilerRepo.findOneBy({ id });
    if (!alquiler) throw new Error('Alquiler no encontrado');
    await this.alquilerRepo.remove(alquiler);
    return alquiler;
  }
}
