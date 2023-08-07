import { HOST } from '@shared/constants'
import axios from 'axios'

export const api = axios.create({
  baseURL: HOST,
  timeout: 3000,
  headers: {
    'Access-Control-Expose-Headers': '*',
  },
})
