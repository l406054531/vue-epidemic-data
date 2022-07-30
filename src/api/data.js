import request from '@/utils/request';
import { baseURL } from '@/config'
export function getAllData (url) {
  return request({
    baseURL,
    method: 'get',
    url: `${url}/findAll`,
    timeout: 30000,
    headers: {
      token:'U2FsdGVkX1+6DXqPT9mFaKWnWn8XR/9ddZUZ/psxBNk='
    }
  })
}

