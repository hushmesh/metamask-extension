import axios from 'axios'

const BASE_URL = 'https://api.hshm.sh/v0/getToken'
const CLIENT_ID = 'XE6PJ0DhUkLXqYYnENunqdswpTw4UDGD'
const REDIRECT_URI = window.location.origin

const getTokens = (payload) => {
  const { code, codeVerifier } = payload

  const params = new URLSearchParams()
  params.append('client_id', CLIENT_ID)
  params.append('code_verifier', codeVerifier)
  params.append('grant_type', 'authorization_code')
  params.append('code', code)
  params.append('redirect_uri', encodeURIComponent(REDIRECT_URI))

  return axios.post(BASE_URL, params)
}

export default {
  getTokens,
}
