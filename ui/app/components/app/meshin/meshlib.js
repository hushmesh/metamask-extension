function Meshlib (options) {
  this.options = options
  if (!options) {
    throw new Error('Options for meshlib are misssing')
  }

  const getAuthUrl = (options) => {
    const BASE_URL = 'https://api.hshm.sh/v0/init'
    const { responseType, clientId, redirectUri } = options
    const url = `${BASE_URL}?&response_type=${responseType}&client_id=${clientId}&redirect_uri=` + encodeURIComponent(redirectUri)
    return url
  }

  function getSessionId (url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const response = JSON.parse(xhr.responseText)
          if (response && response.sessionId) {
            resolve(response.sessionId)
          } else {
            reject(new Error('Unable to get session id'))
          }
        }
      }
      xhr.onerror = () => {
        reject(new Error('Unable to get session id'))
      }
      xhr.open('GET', url)
      xhr.send()
    })
  }

  function getMobileOperatingSystem () {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return 'winphone'
    }
    if (/android/i.test(userAgent)) {
      return 'android'
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'ios'
    }
    return null
  }

  function createAppLink (sessionId) {
    let link = 'hushmesh://mesh.in'
    if (sessionId) {
      link = link + '?sessionId=' + sessionId
    }
    return link
  }

  this.meshin = function () {
    if (!this.options) {
      throw new Error('No Meshin options found. Add meshin options please')
    }
    let authUrl = getAuthUrl(this.options)
    const mobileOS = getMobileOperatingSystem()
    if (mobileOS === 'android' || mobileOS === 'ios') {
      authUrl = authUrl + '&mobile=1'
      getSessionId(authUrl)
        .then((res) => {
          const appLink = createAppLink(res)
          window.location.href = appLink
        })
    } else {
      window.location.href = authUrl
    }
  }

  this.init = function () {
    const button = document.getElementById('meshin-button')
    button.addEventListener('click', () => {
      this.meshin()
    })
  }
}

export default Meshlib
