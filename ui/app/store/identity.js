import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'
import tokenApi from './token'

const makeId = (length) => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const generateChallengeData = () => {
  const codeVerifier = makeId(128)
  const codeChallenge = Base64.stringify(sha256(codeVerifier)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  return { codeVerifier, codeChallenge }
}

const getAuthUrl = (options) => {
  const BASE_URL = 'https://api.mesh.in/v0/init'
  const { responseType, clientId, redirectUri } = options
  const url = `${BASE_URL}?&response_type=${responseType}&client_id=${clientId}&redirect_uri=` + encodeURIComponent(redirectUri)
  return url
}

const getUrlParameter = (name, url) => {
  if (!url) {
    url = window.location.href
  }
  name = name.replace(/[\[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  const results = regex.exec(url)
  if (!results) {
    return null
  }
  if (!results[2]) {
    return ''
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

const meshin = () => {
  const { codeChallenge, codeVerifier } = generateChallengeData()
  return new Promise((resolve, reject) => {
    const redirectUri = chrome.identity.getRedirectURL()
    const url = getAuthUrl({
      clientId: 'XE6PJ0DhUkLXqYYnENunqdswpTw4UDGD',
      responseType: 'code',
      redirectUri: redirectUri,
      codeChallenge,
      codeChallengeMethod: 'S256',
    })

    chrome.identity.launchWebAuthFlow({
      url,
      interactive: true,
    }, (res) => {
      console.log('Debug: Web Auth flow success >>> ', res)
      const code = getUrlParameter('code', res)

      if (code) {
        tokenApi.getTokens({ code, codeVerifier }).then((res) => {
          const accessToken = res.data.access_token
          const jwt = res.data.id_token
          let relationshipKey = ''
          if (jwt) {
            const tokens = jwt.split('.')
            const jwtObj = JSON.parse(atob(tokens[1]))
            relationshipKey = jwtObj.relationshipKey
          }
          resolve({ accessToken, relationshipKey })
        }).catch((err) => {
          reject(err)
        })
      } else {
        reject(res)
      }
    })
  })
}

export default {
  meshin,
}
