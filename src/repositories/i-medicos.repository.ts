import { Medico } from './../models/medico.model'
import CriarAlterarMedicoDTO from '../dtos/criar-medico.dto'
import { UpdateResult } from 'typeorm'

export default interface IMedicoRepository {
  createAndSave(data: CriarAlterarMedicoDTO): Promise<Medico>
  softDeleted(crm: string): Promise<UpdateResult>
  findByCRM(crm: string): Promise<Medico | undefined>
  update(crm: string, data: CriarAlterarMedicoDTO): Promise<UpdateResult>
  find(busca: string): Promise<Medico[] | undefined>
}