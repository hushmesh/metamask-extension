import axios from 'axios'

const BASE_URL = 'https://api.hshm.sh/v0/logout'

const setHeaders = (accessToken) => {
  const axiosConfig = { headers: {} }
  if (accessToken) {
    axiosConfig.headers = {
      Authorization: `Bearer ${accessToken}`,
    }
  }
  return axiosConfig
}

const meshout = (accessToken) => {
  const config = setHeaders(accessToken)
  return axios.get(BASE_URL, config)
}

export default {
  meshout,
}
