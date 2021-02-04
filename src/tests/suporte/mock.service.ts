export const copiarMock = <TipoDadoMockado>(mock: TipoDadoMockado): TipoDadoMockado => {
  const mockTratado = JSON.parse(JSON.stringify(mock))
  return mockTratado
}

