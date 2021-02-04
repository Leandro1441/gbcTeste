import CriarAlterarMedicoDTO from '../../../dtos/criar-medico.dto'
import { MedicoRequest } from '../../../modules/medico/medico'

export const mockMedicoRequest: MedicoRequest = {
  nomeMedico: 'Leandro do nasciemnto da silva',
  cep: '04230-040',
  numeroEndereco: '45',
  complementoEndereco: '',
  dddFixo: undefined,
  telefoneFixo: undefined,
  crm: '9999955',
  dddCelular: '11',
  telefoneCelular: '983163275'
}

export const medicoToSave: CriarAlterarMedicoDTO = {
  CRM: '99.999.55',
  complementoEndereco: '',
  dddCelular: '11',
  isDeleted: 0,
  nomeMedico: 'Leandro do nasciemnto da silva',
  rua: 'Praça da Sé',
  numeroEndereco: '45',
  telefoneCelular: '98316-3275',
  telefoneFixo: '0000-0000',
  dddFixo: undefined,
  CEP: '01001-000'
}
