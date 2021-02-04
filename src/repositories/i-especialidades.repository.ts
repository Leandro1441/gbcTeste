import { Especialidade } from '../models/especialidade.model'

export default interface IEspecialidade {
  find(busca: string, skip: number): Promise<Especialidade[]>
}