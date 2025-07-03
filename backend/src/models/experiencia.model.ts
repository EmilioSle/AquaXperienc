// src/models/experiencia.model.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from './usuario.model';

@Entity('experiencias')
export class Experiencia {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  titulo!: string;

  @Column({ type: 'text', nullable: true })
  descripcion!: string;

  @Column({ type: 'text' })
  tipo!: 'surf' | 'buceo' | 'kitesurf' | 'otro';

  @Column({ type: 'text', nullable: true })
  ubicacion!: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'instructor_id' })
  instructor!: Usuario;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  precio!: number;

  @Column({ type: 'int' })
  cupos!: number;

  @Column({ type: 'date' })
  fecha!: string;

  @Column({ type: 'time' })
  hora!: string;

  @Column({
    type: 'text',
    default: 'disponible',
  })
  estado!: 'disponible' | 'completada' | 'cancelada';
}
