import { ValidationError } from './error/error.class'
import Joi from '@hapi/joi'

export const validarSchema = <T>(data: T, schema: Joi.AnySchema, retornarMensagem = true) => {
  const validation = schema.validate(data)

  if (validation.error) {
    if (retornarMensagem) return validation.error.message
    throw new ValidationError(validation.error.message)
  }

  return undefined
}
