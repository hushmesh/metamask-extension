import axios from 'axios'

const BASE_URL = 'https://api.hshm.sh/v0/storage'

const setHeaders = (accessToken) => {
  const axiosConfig = { headers: {} }
  if (accessToken) {
    axiosConfig.headers = {
      Authorization: `Bearer ${accessToken}`,
    }
  }
  return axiosConfig
}

const fetchData = (accessToken, id) => {
  const config = setHeaders(accessToken)
  return axios.get(`${BASE_URL}/${id}`, config)
}

const storeData = (accessToken, id, data) => {
  const config = setHeaders(accessToken)
  config.headers['Content-Type'] = 'application/json'
  return axios.post(`${BASE_URL}/${id}`, data, config)
}

export default {
  fetchData,
  storeData,
}
