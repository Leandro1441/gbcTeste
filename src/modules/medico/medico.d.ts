
export interface MedicoRequest {
  nomeMedico: string
  cep: string
  numeroEndereco: string
  complementoEndereco?: string
  dddFixo?: string
  telefoneFixo?: string
  crm?: string
  dddCelular: string
  telefoneCelular: string
}

export interface DadosMedicoRequest {
  medico: MedicoRequest
  especialidades: {
    idEspecialidade: string
  }[]
}