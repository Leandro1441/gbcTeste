import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, VersionColumn } from 'typeorm'
import { MedicoEspecialidade } from './medico-especialidade.model';

@Entity ('especialidades')

export class Especialidade {
  @PrimaryGeneratedColumn('uuid')
  especialidadeId: string

  @Column( {
    type: 'varchar',
    nullable: false,
    length: 120
  })
  nomeEspecilidade: string

  @OneToMany(() => MedicoEspecialidade, medicoEspecialidade => medicoEspecialidade.especialidade)
  medicoEspecialidades?: MedicoEspecialidade[]

  @CreateDateColumn({ type: 'timestamp' })
  created?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updated?: Date;

  @VersionColumn({ default: 0 })
  version?: number;
}