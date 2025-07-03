// src/models/perfil_instructor.model.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from './usuario.model';

@Entity('perfiles_instructores')
export class PerfilInstructor {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Usuario;

  @Column({ type: 'text', nullable: true })
  certificaciones!: string;

  @Column({ type: 'text', nullable: true })
  idiomas!: string;

  @Column({ type: 'numeric', precision: 2, scale: 1, default: 0 })
  calificacion!: number;
}
