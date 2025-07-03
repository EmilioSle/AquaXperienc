// src/services/equipoService.ts
import { AppDataSource } from '../config/data-source';
import { Equipo } from '../models/equipo.model';
import { Repository } from 'typeorm';
import { IEquipo } from '../interfaces/Iequipo';

export class EquipoService implements IEquipo {
  private equipoRepo: Repository<Equipo>;

  constructor() {
    this.equipoRepo = AppDataSource.getRepository(Equipo);
  }

  async findAll(): Promise<Equipo[]> {
    return await this.equipoRepo.find({ relations: ['proveedor'] });
  }

  async findById(id: string): Promise<Equipo | null> {
    return await this.equipoRepo.findOne({ where: { id }, relations: ['proveedor'] });
  }

  async save(data: Equipo): Promise<Equipo> {
    return await this.equipoRepo.save(data);
  }

  async update(id: string, data: Equipo): Promise<Equipo> {
    const equipo = await this.equipoRepo.findOneBy({ id });
    if (!equipo) throw new Error('Equipo no encontrado');
    Object.assign(equipo, data);
    return await this.equipoRepo.save(equipo);
  }

  async delete(id: string): Promise<Equipo> {
    const equipo = await this.equipoRepo.findOneBy({ id });
    if (!equipo) throw new Error('Equipo no encontrado');
    await this.equipoRepo.remove(equipo);
    return equipo;
  }
}
