import cors, { CorsOptions } from 'cors'
import express from 'express'
import { conectarBD } from './database'
import especialidadeBoletoRouter from './modules/especialidade/especialidade.controller'
import medicoBoletoRouter from './modules/medico/medico.controller'
import { inicializarRabbitMQ } from './services/infra/fila/fila.infra'

const CONFIG = { PORT: process.env.PORT || '80' }

const corsOptions: CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With'],
  credentials: true
}

const app: express.Application = express()

app.use(express.json())
app.use(cors(corsOptions))

const router = express.Router()

router.use('/medico', medicoBoletoRouter)
router.use('/especialidade', especialidadeBoletoRouter)

app.use('/v1/', router)

app.listen(CONFIG.PORT, () => { console.log('Listening on ' + CONFIG.PORT) })

async function inicializar (): Promise<void> {
  await conectarBD()
  await inicializarRabbitMQ()
}


inicializar()


