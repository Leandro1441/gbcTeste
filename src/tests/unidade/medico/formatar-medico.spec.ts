import { medicoToSave, mockMedicoRequest } from './../../suporte/medico/medico.data'
import { expect } from 'chai'
import { copiarMock } from '../../suporte/mock.service'
import { formatarMedicoParaSalvar } from '../../../modules/medico/medico.service'


describe('UNIDADE | Formatar um medico para salvar no BD', async () => {
  it('Quando o medico é formatado com sucesso', () => {
    const mock = copiarMock(mockMedicoRequest)
    const resul = formatarMedicoParaSalvar(mock, {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      complemento: 'lado ímpar',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
      ibge: '3550308',
      gia: '1004',
      ddd: '11',
      siafi: '7107'
    })

    expect(resul).to.deep.equal(medicoToSave)
  })
})