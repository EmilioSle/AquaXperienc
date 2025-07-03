// src/models/equipo.model.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from './usuario.model';

@Entity('equipos')
export class Equipo {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  nombre!: string;

  @Column({ type: 'text', nullable: true })
  descripcion!: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'proveedor_id' })
  proveedor!: Usuario;

  @Column({ type: 'boolean', default: true })
  disponible!: boolean;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  precio_alquiler!: number;
}
