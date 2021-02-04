import { Channel, connect, Connection } from 'amqplib'

type Exchange = 'medico'

export const ATIVAR_FILA = (process.env.FILA || 'NAO')

let canal: Channel
let conexao: Connection

export const inicializarRabbitMQ = async (): Promise<{ canal?: Channel; conexao?: Connection }> => {
  if (ATIVAR_FILA === 'NAO') return { canal, conexao }

  conexao = await connect(process.env.MESSAGE_BROKER ?? '')
  canal = await conexao.createChannel()

  return { canal, conexao }
}

export const enviarParaFila = async <DADOS extends object>(dados: DADOS | DADOS[], exchange: Exchange = 'medico', routingKey: string, fila?: string): Promise<boolean> => {
  if (ATIVAR_FILA === 'NAO') return false

  await canal.assertExchange(exchange, 'topic', {
    alternateExchange: 'dead',
    durable: true
  })

  const buffer = Buffer.from(JSON.stringify(dados))

  const config = {
    deliveryMode: 2,
    persistent: true,
    type: 'topic'
  } as const

  const resultado = (fila == null)
    ? canal.publish(exchange, routingKey, buffer, config)
    : canal.sendToQueue(fila, buffer)

  return resultado
}
