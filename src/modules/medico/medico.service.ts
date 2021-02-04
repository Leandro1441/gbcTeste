import { enviarParaFila } from './../../services/infra/fila/fila.infra';
import { Medico } from './../../models/medico.model'

import CriarAlterarMedicoDTO from '../../dtos/criar-medico.dto'
import MedicoRepository from '../../repositories/implementations/typeorm/medicos.repository'
import { CorreioReponse } from '../../services/correrios/correio'
import { buscarCep } from '../../services/correrios/correio.infra'
import { DadosMedicoRequest, MedicoRequest } from './medico'
import MedicoEspecialidadeRepository from '../../repositories/implementations/typeorm/medico-especialidades'
import CriarMedicoEspecialidadeDTO from '../../dtos/criar-medico-especialidade.dto'
import { formatarCRM, telefone } from '../../services/formatar.fn'
import { NotFoundError } from '../../services/error/error.class'
import { UpdateResult } from 'typeorm'

const formartarMedicoParaSalvar = (medico: MedicoRequest, endereco: CorreioReponse): CriarAlterarMedicoDTO => {
  const medicoToSave: CriarAlterarMedicoDTO = {
    CRM: formatarCRM(medico.crm),
    complementoEndereco: medico.complementoEndereco,
    dddCelular: medico.dddCelular,
    isDeleted: 0,
    nomeMedico: medico.nomeMedico,
    rua: endereco.logradouro,
    numeroEndereco: medico.numeroEndereco,
    telefoneCelular: telefone(medico.telefoneCelular),
    telefoneFixo: telefone(medico.telefoneFixo, 'fixo'),
    dddFixo: medico.dddFixo,
    CEP: endereco.cep // formatado 00000-000 pela request
  }

  return medicoToSave
}

export const criarMedico = async (dados: DadosMedicoRequest): Promise<Medico> => {
  const endereco = await buscarCep(dados.medico.cep)

  const medicoRepository = new MedicoRepository()
  const medicoEspecialidadeRepository = new MedicoEspecialidadeRepository()

  const medicoFormatadoToSave = formartarMedicoParaSalvar(dados.medico, endereco)

  const medicoSave = await medicoRepository.createAndSave(medicoFormatadoToSave)

  dados.especialidades.map(async (especialidade) => {
    const especialidadeFormatada: CriarMedicoEspecialidadeDTO = {
      especialidade: especialidade.idEspecialidade,
      medico: medicoSave
    }
    await medicoEspecialidadeRepository.createAndSave(especialidadeFormatada)
  })

  await enviarParaFila(medicoSave, 'medico', 'medico.criado')

  return medicoSave
}


export const buscarMedico = async (crm: string): Promise<Medico | undefined> => {
  const medicoRepository = new MedicoRepository()
  const medico = await medicoRepository.findByCRM(crm)

  if (!medico) throw new NotFoundError('Medico não encontrado!')

  return medico
}

export const buscarMedicoPorEspecialidade = async (especialidade: string): Promise<Medico[]> => {
  const medicoRepository = new MedicoRepository()
  const medico = await medicoRepository.findByEspecialidade(especialidade)

  if (!medico) throw new NotFoundError('Medico não encontrado!')

  return medico
}

export const alterarStatusMedico = async (crm: string): Promise<UpdateResult> => {
  const medicoRepository = new MedicoRepository()
  const resultado = await medicoRepository.softDeleted(crm)

  if (!resultado.affected) throw new NotFoundError('Medico não encontrado!')

  return resultado
}

export const alterarMedico = async (crm: string, medico: MedicoRequest) => {
  const endereco = await buscarCep(medico.cep)

  const medicoRepository = new MedicoRepository()
  const medicoFormatadoToSave = formartarMedicoParaSalvar(medico, endereco)

  const resultado = await medicoRepository.update(crm, medicoFormatadoToSave)

  if (!resultado.affected) throw new NotFoundError('Medico não encontrado!')

  return resultado
}

export const buscarMedicos = (busca: string = '', skip: number) => {
  const medicoRepository = new MedicoRepository()

  const medicos = medicoRepository.find(busca, skip)

  return medicos
} 