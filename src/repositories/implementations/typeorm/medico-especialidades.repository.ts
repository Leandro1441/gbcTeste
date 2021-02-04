import { MedicoEspecialidade } from '../../../models/medico-especialidade.model'
import { getRepository, Repository } from 'typeorm'
import IMedicoEspecialidadeRepository from '../../i-medico-especialidades.repository'
import CriarMedicoEspecialidadeDTO from '../../../dtos/criar-medico-especialidade.dto'


class MedicoEspecialidadeRepository implements IMedicoEspecialidadeRepository {
  constructor(
    private ormRepository: Repository<MedicoEspecialidade> = getRepository(MedicoEspecialidade)
  ) { }

  public async createAndSave(medicoEspecilidadeData: CriarMedicoEspecialidadeDTO): Promise<MedicoEspecialidade> {
    const medico = this.ormRepository.create(medicoEspecilidadeData)

    await this.ormRepository.save(medico)

    return medico
  }
}

export default MedicoEspecialidadeRepository