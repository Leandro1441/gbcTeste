import { MedicoEspecialidade } from './medico-especialidade.model';
import { Column, CreateDateColumn, OneToMany, PrimaryColumn, VersionColumn } from 'typeorm'
import { Entity } from 'typeorm/decorator/entity/Entity'

@Entity('medicos')

export class Medico {
  @PrimaryColumn({
    type: 'varchar',
    length: 9
  }) 
  CRM: string

  @Column( {
    type: 'varchar',
    nullable: false,
    length: 120
  })
  nomeMedico: string

  @Column( {
    type: 'varchar',
    nullable: false,
    length: 120
  })
  rua: string

  @Column( {
    type: 'varchar',
    nullable: false,
    length: 7
  })
  numeroEndereco: string

  @Column( {
    type: 'varchar',
    nullable: false,
    length: 9
  })
  CEP: string

  @Column( {
    type: 'varchar',
    nullable: true,
    length: 120
  })
  complementoEndereco: string

  @Column( {
    type: 'varchar',
    nullable: true,
    length: 2
  })
  dddFixo?: string

  @Column( {
    type: 'varchar',
    nullable: true,
    length: 9
  })
  telefoneFixo?: string
  
  @Column( {
    type: 'varchar',
    nullable: false,
    length: 2
  })
  dddCelular: string

  @Column( {
    type: 'varchar',
    nullable: false,
    length: 10
  })
  telefoneCelular: string

  @Column( {
    type: 'tinyint',
    nullable: true,
  })
  isDeleted: number

  @OneToMany(() => MedicoEspecialidade, medicoEspecialidade => medicoEspecialidade.medico)
  medicoEspecialidades?: MedicoEspecialidade[]

  @CreateDateColumn({ type: 'timestamp' })
  created?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updated?: Date;

  @VersionColumn({ default: 0 })
  version?: number;
}