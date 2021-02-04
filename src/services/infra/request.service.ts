import axios, { AxiosRequestConfig } from 'axios'

export const execGet = async <T>(url: string, options?: AxiosRequestConfig, request = axios) => {
  const resultado = await request.get<T>(url, options).catch((error) => {
    throw new Error(JSON.stringify(error.response.data, null, 4))
  })

  return resultado.data
}