// src/services/experienciaService.ts
import { AppDataSource } from '../config/data-source';
import { Experiencia } from '../models/experiencia.model';
import { Repository } from 'typeorm';
import { IExperiencia } from '../interfaces/Iexperiencia';

export class ExperienciaService implements IExperiencia {
  private experienciaRepo: Repository<Experiencia>;

  constructor() {
    this.experienciaRepo = AppDataSource.getRepository(Experiencia);
  }

  async findAll(): Promise<Experiencia[]> {
    return await this.experienciaRepo.find({ relations: ['instructor'] });
  }

  async findById(id: string): Promise<Experiencia | null> {
    return await this.experienciaRepo.findOne({ where: { id }, relations: ['instructor'] });
  }

  async save(data: Experiencia): Promise<Experiencia> {
    return await this.experienciaRepo.save(data);
  }

  async update(id: string, data: Experiencia): Promise<Experiencia> {
    const experiencia = await this.experienciaRepo.findOneBy({ id });
    if (!experiencia) throw new Error('Experiencia no encontrada');
    Object.assign(experiencia, data);
    return await this.experienciaRepo.save(experiencia);
  }

  async delete(id: string): Promise<Experiencia> {
    const experiencia = await this.experienciaRepo.findOneBy({ id });
    if (!experiencia) throw new Error('Experiencia no encontrada');
    await this.experienciaRepo.remove(experiencia);
    return experiencia;
  }
}
