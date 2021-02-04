import CriarMedicoEspecialidadeDTO from '../dtos/criar-medico-especialidade.dto'
import { MedicoEspecialidade } from '../models/medico-especialidade.model'

export default interface IMedicoEspecialidadeRepository {
  createAndSave(data: CriarMedicoEspecialidadeDTO): Promise<MedicoEspecialidade>
}