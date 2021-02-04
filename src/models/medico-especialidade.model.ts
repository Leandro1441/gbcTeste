import { Especialidade } from './especialidade.model';

import { CreateDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn, VersionColumn } from 'typeorm'
import { Entity } from 'typeorm/decorator/entity/Entity'
import { Medico } from './medico.model';

@Entity('medicos_especialidades')

export class MedicoEspecialidade {
  @PrimaryGeneratedColumn('uuid')
  medicoEspecildadeId: string

  @ManyToOne(() => Medico, medico => medico.medicoEspecialidades, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({
    name: 'CRM'
  })
  medico: Medico | string

  @ManyToOne(() => Especialidade, especialidade => especialidade.medicoEspecialidades,{ nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({
    name: 'especilidadeId'
  })
  especialidade: Especialidade | string

  @CreateDateColumn({ type: 'timestamp' })
  created?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updated?: Date;

  @VersionColumn({ default: 0 })
  version?: number;
}