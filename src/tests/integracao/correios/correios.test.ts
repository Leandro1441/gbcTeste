import { expect } from 'chai'
import { buscarCep } from '../../../services/correrios/correio.infra'
import { correiosReponse } from '../../suporte/correios/correios.data'

describe('UNIDADE | Formatar um medico para salvar no BD', async () => {
  it('Quando o medico é formatado com sucesso', async() => {
    const resul = await buscarCep('01001-000')
    expect(resul).to.deep.equal(correiosReponse)
  })
})


