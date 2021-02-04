import { Medico } from '../models/medico.model'
import { Especialidade } from './../models/especialidade.model'

export default interface CriarMedicoEspecialidadeDTO {
  medico: string | Medico
  especialidade: string | Especialidade
}