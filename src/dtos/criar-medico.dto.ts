export default interface CriarAlterarMedicoDTO {
  CRM: string
  nomeMedico: string
  rua: string
  numeroEndereco: string
  complementoEndereco?: string
  dddFixo?: string
  telefoneFixo: string
  dddCelular: string
  telefoneCelular: string
  isDeleted: number
  CEP: string
}