// src/models/reserva.model.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Usuario } from './usuario.model';
import { Experiencia } from './experiencia.model';

@Entity('reservas')
export class Reserva {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Usuario;

  @ManyToOne(() => Experiencia)
  @JoinColumn({ name: 'experiencia_id' })
  experiencia!: Experiencia;

  @CreateDateColumn({ name: 'fecha_reserva' })
  fecha_reserva!: Date;

  @Column({
    type: 'text',
    default: 'pendiente',
  })
  estado!: 'pendiente' | 'confirmada' | 'cancelada' | 'finalizada';

  @Column({ type: 'text', nullable: true })
  metodo_pago!: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  monto!: number;
}
