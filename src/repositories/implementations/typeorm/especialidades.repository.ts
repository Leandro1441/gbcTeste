import { Especialidade } from './../../../models/especialidade.model'
import { getRepository, Repository } from 'typeorm'
import IEspecialidadeRepository from '../../i-especialidades.repository'
import * as SQL from '../../../database'

class EspecialidadeRepository implements IEspecialidadeRepository {
  constructor(
    private ormRepository: Repository<Especialidade> = getRepository(Especialidade)
  ) { }

  public async find(busca: string = '', skip: number): Promise<Especialidade[]> {
    const especialidade = await this.ormRepository.createQueryBuilder()
    .where(`nomeEspecilidade LIKE ${SQL.escape('%' + busca + '%')}`).getMany()

    return especialidade
  }
}

export default EspecialidadeRepository