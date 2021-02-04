import { Medico } from './../../../models/medico.model'
import { getRepository, Repository, UpdateResult } from 'typeorm'
import IMedicoRepository from '../../i-medicos.repository'
import CriarAlterarMedicoDTO from '../../../dtos/criar-medico.dto'
import * as SQL from '../../../database'

class MedicoRepository implements IMedicoRepository {
  constructor(
    private ormRepository: Repository<Medico> = getRepository(Medico)
  ) { }

  public async createAndSave(medicoData: CriarAlterarMedicoDTO): Promise<Medico> {
    const medico = this.ormRepository.create(medicoData)

    await this.ormRepository.save(medico)

    return medico
  }

  public async softDeleted(CRM: string): Promise<UpdateResult> {
    const medico = this.ormRepository.update({
      CRM
    }, {
      isDeleted: 1
    })

    return medico
  }

  public async findByCRM(CRM: string): Promise<Medico | undefined> {
    const medico = await this.ormRepository.findOne({
      where: {
        CRM
      }
    })

    return medico
  }

  public async update(CRM: string, data: CriarAlterarMedicoDTO): Promise<UpdateResult> {
    const resultado = await this.ormRepository.update(CRM, data)

    return resultado
  }

  public async findByEspecialidade(crm: string): Promise<Medico[]> {
    const medico = this.ormRepository.createQueryBuilder('medicos')
      .innerJoin('medicos_especialidades', 'medicos_especialidades', 'medicos_especialidades.CRM = medicos.CRM')
      .innerJoin('especialidades', 'especialidades', 'especialidades.especialidadeId = medicos_especialidades.especialidadeId')
      .getMany()

    return medico
  }

  public async find(busca: string = '', skip: number): Promise<Medico[] | undefined> {
    const medicos = await this.ormRepository.createQueryBuilder()
      .where(
        `CRM LIKE ${SQL.escape('%' + busca + '%')} OR nomeMedico like ${SQL.escape('%' + busca + '%')} OR rua LIKE ${SQL.escape('%' + busca + '%')}
      OR CEP LIKE ${SQL.escape('%' + busca + '%')} OR telefoneFixo LIKE ${SQL.escape('%' + busca + '%')}
      OR telefoneFixo LIKE ${SQL.escape('%' + busca + '%')} OR telefoneCelular LIKE ${SQL.escape('%' + busca + '%')}`
      )
      .limit(10)
      .skip(skip)
      .getMany()

    return medicos
  }
}

export default MedicoRepository