import Joi from '@hapi/joi'

export const medicoSchema = Joi.object().keys({
  nomeMedico: Joi.string().max(120).required(),
  cep: Joi.string().max(8).required(),
  numeroEndereco: Joi.string().max(7).required(),
  complementoEndereco: Joi.string().max(120).optional(),
  dddFixo: Joi.string().max(2).optional(),
  telefoneFixo: Joi.string().max(9).optional(),
  crm: Joi.string().min(7).max(7).required(),
  dddCelular: Joi.string().max(2).required(),
  telefoneCelular: Joi.string().max(10).required()
}).required()

export const medicoUpdateSchema = Joi.object().keys({
  nomeMedico: Joi.string().max(120).required(),
  cep: Joi.string().max(8).required(),
  numeroEndereco: Joi.string().max(7).required(),
  complementoEndereco: Joi.string().max(120).optional(),
  dddFixo: Joi.string().max(2).optional(),
  telefoneFixo: Joi.string().max(9).optional(),
  dddCelular: Joi.string().max(2).required(),
  telefoneCelular: Joi.string().max(10).required()
}).required()

export const dadosMedicoSchama = Joi.object().keys({
  medico: medicoSchema,
  especialidades: Joi.array().items(Joi.object().keys({
    idEspecialidade: Joi.string().required()
  })).required().min(2)
})