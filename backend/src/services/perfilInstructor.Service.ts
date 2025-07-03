// src/services/perfilInstructor.Service.ts
import { AppDataSource } from '../config/data-source';
import { PerfilInstructor } from '../models/perfil_instructor.model';
import { Repository } from 'typeorm';
import { IPerfilInstructor } from '../interfaces/IperfilInstructor';

export class PerfilInstructorService implements IPerfilInstructor {
  private perfilRepo: Repository<PerfilInstructor>;

  constructor() {
    this.perfilRepo = AppDataSource.getRepository(PerfilInstructor);
  }

  async findAll(): Promise<PerfilInstructor[]> {
    return await this.perfilRepo.find({ relations: ['usuario'] });
  }

  async findById(id: string): Promise<PerfilInstructor | null> {
    return await this.perfilRepo.findOne({ where: { id }, relations: ['usuario'] });
  }

  async save(perfil: PerfilInstructor): Promise<PerfilInstructor> {
    return await this.perfilRepo.save(perfil);
  }

  async update(id: string, perfil: PerfilInstructor): Promise<PerfilInstructor> {
    const existing = await this.perfilRepo.findOneBy({ id });
    if (!existing) throw new Error('Perfil no encontrado');

    Object.assign(existing, perfil);
    return await this.perfilRepo.save(existing);
  }

  async delete(id: string): Promise<PerfilInstructor> {
    const perfil = await this.perfilRepo.findOneBy({ id });
    if (!perfil) throw new Error('Perfil no encontrado');

    await this.perfilRepo.remove(perfil);
    return perfil;
  }
}
