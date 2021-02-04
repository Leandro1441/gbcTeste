import { Medico } from './../../../models/medico.model';
import { getRepository, Repository, UpdateResult } from 'typeorm'
import IMedicoRepository from '../../i-medicos.repository'
import CriarAlterarMedicoDTO from '../../../dtos/criar-medico.dto'

class MedicoRepository implements IMedicoRepository {
  constructor(
    private ormRepository: Repository<Medico> = getRepository(Medico)
  ) { }

  public async createAndSave(medicoData: CriarAlterarMedicoDTO): Promise<Medico> {
    const medico = this.ormRepository.create(medicoData)

    await this.ormRepository.save(medico)

    return medico
  }

  public async softDeleted(crm: string): Promise<UpdateResult> {
    const medico = this.ormRepository.update({
      CRM: crm
    }, {
      isDeleted: 1
    })

    return medico
  }

  public async findByCRM(crm: string): Promise<Medico | undefined> {
    const medico = await this.ormRepository.findOne({
      where: {
        CRM: crm
      }
    })

    return medico
  }

  public async update(crm: string, data: CriarAlterarMedicoDTO): Promise<UpdateResult> {
    const medico = this.ormRepository.update({
      CRM: crm
    }, data)

    return medico
  }

  public async find(busca: string): Promise<Medico[] | undefined> {
    const medicos = await this.ormRepository.createQueryBuilder()
    .where(
      `CRM like :busca or nomeMedico like :busca or rua like :busca or CEP like :busca or telefoneFixo like :busca
      or telefoneFixo like :busca or telefoneCelular like :busca`, {
        busca: busca
      }
    ).getMany()

    return medicos
  }
}

export default MedicoRepository