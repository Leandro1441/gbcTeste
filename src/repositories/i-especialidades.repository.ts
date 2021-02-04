import { Especialidade } from '../models/especialidade.model'

export default interface IEspecialidadeRepository {
  find(busca: string, skip: number): Promise<Especialidade[]>
}