// src/services/notificacionService.ts
import { AppDataSource } from '../config/data-source';
import { Notificacion } from '../models/notificacion.model';
import { Repository } from 'typeorm';
import { INotificacion } from '../interfaces/Inotificacion';

export class NotificacionService implements INotificacion {
  private notiRepo: Repository<Notificacion>;

  constructor() {
    this.notiRepo = AppDataSource.getRepository(Notificacion);
  }

  async findAll(): Promise<Notificacion[]> {
    return await this.notiRepo.find({ relations: ['usuario'] });
  }

  async findById(id: string): Promise<Notificacion | null> {
    return await this.notiRepo.findOne({ where: { id }, relations: ['usuario'] });
  }

  async save(data: Notificacion): Promise<Notificacion> {
    return await this.notiRepo.save(data);
  }

  async update(id: string, data: Notificacion): Promise<Notificacion> {
    const noti = await this.notiRepo.findOneBy({ id });
    if (!noti) throw new Error('Notificación no encontrada');
    Object.assign(noti, data);
    return await this.notiRepo.save(noti);
  }

  async delete(id: string): Promise<Notificacion> {
    const noti = await this.notiRepo.findOneBy({ id });
    if (!noti) throw new Error('Notificación no encontrada');
    await this.notiRepo.remove(noti);
    return noti;
  }
}
