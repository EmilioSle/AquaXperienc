// src/models/alquiler.model.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from './usuario.model';
import { Equipo } from './equipo.model';

@Entity('alquileres')
export class Alquiler {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Usuario;

  @ManyToOne(() => Equipo)
  @JoinColumn({ name: 'equipo_id' })
  equipo!: Equipo;

  @Column({ type: 'date' })
  fecha_inicio!: string;

  @Column({ type: 'date' })
  fecha_fin!: string;

  @Column({
    type: 'text',
    default: 'activo',
  })
  estado!: 'activo' | 'devuelto' | 'cancelado';

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  precio_total!: number;
}
