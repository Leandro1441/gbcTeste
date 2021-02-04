import { medicoToSave, mockMedicoRequest } from './../../suporte/medico/medico.data'
import { expect } from 'chai'
import { copiarMock } from '../../suporte/mock.service'
import { formatarMedicoParaSalvar } from '../../../modules/medico/medico.service'
import { correiosReponse } from '../../suporte/correios/correios.data'


describe('UNIDADE | Formatar um medico para salvar no BD', async () => {
  it('Quando o medico é formatado com sucesso', () => {
    const mock = copiarMock(mockMedicoRequest)
    const resul = formatarMedicoParaSalvar(mock, correiosReponse)

    expect(resul).to.deep.equal(medicoToSave)
  })
})