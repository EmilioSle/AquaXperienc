// src/services/valoracionService.ts
import { AppDataSource } from '../config/data-source';
import { Valoracion } from '../models/valoracion.model';
import { Repository } from 'typeorm';
import { IValoracion } from '../interfaces/Ivaloracion';

export class ValoracionService implements IValoracion {
  private valoracionRepo: Repository<Valoracion>;

  constructor() {
    this.valoracionRepo = AppDataSource.getRepository(Valoracion);
  }

  async findAll(): Promise<Valoracion[]> {
    return await this.valoracionRepo.find({ relations: ['usuario', 'instructor'] });
  }

  async findById(id: string): Promise<Valoracion | null> {
    return await this.valoracionRepo.findOne({ where: { id }, relations: ['usuario', 'instructor'] });
  }

  async save(data: Valoracion): Promise<Valoracion> {
    return await this.valoracionRepo.save(data);
  }

  async update(id: string, data: Valoracion): Promise<Valoracion> {
    const valoracion = await this.valoracionRepo.findOneBy({ id });
    if (!valoracion) throw new Error('Valoración no encontrada');
    Object.assign(valoracion, data);
    return await this.valoracionRepo.save(valoracion);
  }

  async delete(id: string): Promise<Valoracion> {
    const valoracion = await this.valoracionRepo.findOneBy({ id });
    if (!valoracion) throw new Error('Valoración no encontrada');
    await this.valoracionRepo.remove(valoracion);
    return valoracion;
  }
}
