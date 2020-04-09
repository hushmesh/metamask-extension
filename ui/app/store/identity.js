const getAuthUrl = (options) => {
  const BASE_URL = 'https://api.hshm.sh/v0/init'
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
  return new Promise((resolve, reject) => {
    const redirectUri = chrome.identity.getRedirectURL()
    const url = getAuthUrl({
      clientId: 'XE6PJ0DhUkLXqYYnENunqdswpTw4UDGD',
      responseType: 'token_id_token',
      redirectUri: redirectUri,
    })

    chrome.identity.launchWebAuthFlow({
      url,
      interactive: true,
    }, (res) => {
      console.log('Debug: Web Auth flow success >>> ', res)
      const accessToken = getUrlParameter('access_token', res)
      const jwt = getUrlParameter('id_token', res)
      let masterKey = ''

      if (jwt) {
        const tokens = jwt.split('.')
        const jwtObj = JSON.parse(atob(tokens[1]))
        masterKey = jwtObj.masterKey
        resolve({ accessToken, masterKey })
      } else {
        reject(res)
      }
    })
  })
}

export default {
  meshin,
}
