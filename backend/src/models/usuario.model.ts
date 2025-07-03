// src/models/usuario.model.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  nombre!: string;

  @Column({ type: 'text', unique: true })
  correo!: string;

  @Column({ type: 'text' })
  contrasena!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  tipo_usuario!: 'cliente' | 'instructor' | 'proveedor' | 'admin' | 'soporte';

  @CreateDateColumn({ name: 'fecha_creacion' })
  fecha_creacion!: Date;
}
