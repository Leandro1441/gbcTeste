import { alterarMedico, alterarStatusMedico, buscarMedico, criarMedico, buscarMedicos, buscarMedicoPorEspecialidade } from './medico.service'
import express from 'express'
import { DadosMedicoRequest } from './medico'
import { validarSave, validarUpdate } from './medico.middleware'

const medicoBoletoRouter = express.Router()

medicoBoletoRouter.get('/', async (req, res, next) => {
  try {
    const busca = req.query.busca?.toString()
    const skip = (typeof req.query.skip === 'string') ? parseInt(req.query.skip) : 0

    const medicosBuscados = await buscarMedicos(busca, skip)

    res.status(200).json({ erro: false, resultado: medicosBuscados })
  } catch (error) {
    next(error)
  }
})

medicoBoletoRouter.get('/:crm', async (req, res, next) => {
  try {
    const crm = req.params.crm

    const medico = await buscarMedico(crm)

    res.status(200).json({ erro: false, resultado: medico })
  }
  catch (error) {
    next(error)
  }
})

medicoBoletoRouter.get('/porEspecialidade/:especialidade', async (req, res, next) => {
  try {
    const especialidade = req.params.especialidade
    const medicos = await buscarMedicoPorEspecialidade(especialidade)

    res.status(200).json({ erro: false, resultado: medicos })
  }
  catch (error) {
    next(error)
  }
})

medicoBoletoRouter.post('/', validarSave, async (req, res, next) => {
  try {
    const medico = req.body.dados as DadosMedicoRequest
    const medicoSalvo = await criarMedico(medico)

    res.status(201).json({ erro: false, resultado: medicoSalvo })
  } catch (error) {
    next(error)
  }
})

medicoBoletoRouter.patch('/:crm', validarUpdate, async (req, res, next) => {
  try {
    const crm = req.params.crm
    const dados = req.body.dados as DadosMedicoRequest
    const resultado = await alterarMedico(crm, dados.medico)

    res.status(200).json({ erro: false, resultado: resultado })
  } catch (error) {
    next(error)
  }
})

medicoBoletoRouter.patch('/status/:crm', async (req, res, next) => {
  try {
    const crm = req.params.crm
    const resultado = await alterarStatusMedico(crm)

    res.status(200).json({ erro: false, resultado: resultado })
  } catch (error) {
    next(error)
  }
})


export default medicoBoletoRouter