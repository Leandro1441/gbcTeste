import express from 'express'
import { buscarEspecialidades } from './especialidade.service'

const especialidadeBoletoRouter = express.Router()

especialidadeBoletoRouter.get('/', async (req, res, next) => {
  try {
    const busca = req.query.busca?.toString()
    const skip = (typeof req.query.skip === 'string') ? parseInt(req.query.skip) : 0

    const medicosBuscados = await buscarEspecialidades(busca, skip)

    res.status(200).json({ erro: false, resultado: medicosBuscados })
  } catch (error) {
    next(error)
  }
})

export default especialidadeBoletoRouter