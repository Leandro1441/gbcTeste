import { Especialidade } from './models/especialidade.model'
import { createConnection } from 'typeorm'
import { Medico } from './models/medico.model'
import { MedicoEspecialidade } from './models/medico-especialidade.model'
import mysql from 'mysql'

export const escape = mysql.escape

const tabelas = [Medico, MedicoEspecialidade, Especialidade]

export const conectarBD = async () => {
  await createConnection({
    database: process.env.TYPEORM_DATABASE,
    type: 'mysql',
    port: 3306,
    password: process.env.TYPEORM_PASSOWORD,
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    entities: tabelas,
    logging: true
  })
}