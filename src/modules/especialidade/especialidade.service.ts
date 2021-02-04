import { Especialidade } from '../../models/especialidade.model'
import EspecialidadeRepository from '../../repositories/implementations/typeorm/especialidades.repository'

export const buscarEspecialidades = async(busca: string = '', skip : number): Promise< Especialidade[]> => {
  const especialidadeRepository = new EspecialidadeRepository()

  const especialidade = await especialidadeRepository.find(busca, skip)

  return especialidade
}