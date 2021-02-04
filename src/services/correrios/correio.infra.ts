import { execGet } from '../infra/request.service'
import { CorreioReponse } from './correio'

export const buscarCep = async (cep: string): Promise<CorreioReponse> => {
  const URL = `https://viacep.com.br/ws/${cep}/json/`

  const correrioResponse = await execGet<CorreioReponse>(URL)
  if (correrioResponse.cep === undefined) console.log('aa')

  return correrioResponse
}