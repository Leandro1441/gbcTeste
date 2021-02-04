import { RequestHandler } from 'express'

import { BadRequestError } from '../../services/error/error.class'
import { validarSchema } from '../../services/validator.service'
import { dadosMedicoSchama, medicoSchema } from './medico.schema'

export const validarSave: RequestHandler = async (req, _res, next) => {
  try {
    if (!req.body.dados?.medico) throw new BadRequestError('Não foram recebidos dados do medico para passar na validação, envie o body no seguinte formato: { dados: { medico: { // dados do medico } } }')
    if (!req.body.dados?.especialidades) throw new BadRequestError('Não foram recebidos dados de especialidades do medico para passar na validação, envie o body no seguinte formato: { dados: { especialidades: [ ids especialidades] } }')

    validarSchema(req.body.dados.medico, dadosMedicoSchama, false)
    next()
  } catch (error) {
    next(error)
  }
}

export const validarUpdate: RequestHandler = async (req, _res, next) => {
  try {
    if (!req.body.dados?.medico) throw new BadRequestError('Não foram recebidos dados do medico para passar na validação, envie o body no seguinte formato: { dados: { medico: { // dados do medico } } }')
    
    validarSchema(req.body.dados.medico, medicoSchema, false)
    next()
  } catch (error) {
    next(error)
  }
}