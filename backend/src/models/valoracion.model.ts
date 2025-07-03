// src/models/valoracion.model.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Usuario } from './usuario.model';

@Entity('valoraciones')
export class Valoracion {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Usuario;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'instructor_id' })
  instructor!: Usuario;

  @Column({ type: 'int' })
  puntuacion!: number;

  @Column({ type: 'text', nullable: true })
  comentario!: string;

  @CreateDateColumn()
  fecha!: Date;
}
