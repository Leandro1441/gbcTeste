import { ValidationError } from './error/error.class'

export const formatarCRM = (crm: string): string => {
  const validarCRM = (parseInt(crm)) ? true : false

  if (!validarCRM) throw new ValidationError('O CRM pode apenas ter numero!')

  const crmFormatado = `${crm.substring(0, 2)}.${crm.substring(2, 5)}.${crm.substring(5)}`
  return crmFormatado
}

export const telefone = (telefone: string, tipo = 'celular'): string => {
  if (tipo === 'celular') {
    const parte1 = telefone.slice(0, 5);
    const parte2 = telefone.slice(5, 9);
    return `${parte1}-${parte2}`
  } else {
    const parte1 = telefone.slice(0, 4);
    const parte2 = telefone.slice(4, 8);
    return `${parte1}-${parte2}`
  }
}