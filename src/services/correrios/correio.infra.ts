import { BadRequestError } from './../error/error.class';
import { execGet } from '../infra/request.service'
import { CorreioReponse } from './correio'

export const buscarCep = async (cep: string): Promise<CorreioReponse> => {
  const URL = `https://viacep.com.br/ws/${cep}/json/`

  const correrioResponse = await execGet<CorreioReponse>(URL)
  if (correrioResponse.cep === undefined) throw new BadRequestError('Cep não encontrado')

  return correrioResponse
}