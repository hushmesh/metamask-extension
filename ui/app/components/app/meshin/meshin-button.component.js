import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../ui/button'
import { INITIALIZE_CREATE_SEED_ROUTE_MESH, INITIALIZE_MESH_WRONG_PASSWORD, DEFAULT_ROUTE } from '../../../helpers/constants/routes'

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

export default class MeshinButton extends Component {

  static propTypes = {
    disabled: PropTypes.bool,
    submitButtonType: PropTypes.string,
    buttonSizeLarge: PropTypes.bool,
    history: PropTypes.object,
    setMeshCredentials: PropTypes.func,
    getSeedFromMesh: PropTypes.func,
    createNewAccountFromSeed: PropTypes.func,
    tryUnlockMetamask: PropTypes.func,
    completeOnboarding: PropTypes.func,
    isInitialized: PropTypes.bool,
  }

  handleMeshCredentials (redirectString) {
    const { isInitialized, setMeshCredentials, getSeedFromMesh, history, tryUnlockMetamask, createNewAccountFromSeed, completeOnboarding } = this.props
    const accessToken = getUrlParameter('access_token', redirectString)
    const jwt = getUrlParameter('id_token', redirectString)
    let masterKey = ''

    if (jwt) {
      const tokens = jwt.split('.')
      const jwtObj = JSON.parse(atob(tokens[1]))
      masterKey = jwtObj.masterKey
    }
    setMeshCredentials({ accessToken, masterKey })
    getSeedFromMesh().then(async (res) => {
      if (res === 'new') {
        history.push(INITIALIZE_CREATE_SEED_ROUTE_MESH)
      } else {
        // if existing seed in the mesh
        if (isInitialized) {
          try {
            await tryUnlockMetamask(masterKey)
            history.push(DEFAULT_ROUTE)
          } catch (err) {
            if (err) {
              history.push(INITIALIZE_MESH_WRONG_PASSWORD)
            }
          }
        } else {
          try {
            await createNewAccountFromSeed(masterKey, res)
            await completeOnboarding()
            history.push(DEFAULT_ROUTE)
          } catch (error) {
            throw new Error(error.message)
          }
        }
      }
    })
  }

  render () {
    const {
      disabled,
      submitButtonType,
      buttonSizeLarge = false,
    } = this.props

    const handler = () => {
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
        console.log('WEB AUTH FLOW SUCCESS >>> ', res)
        this.handleMeshCredentials(res)
      })
    }

    return (
      <div className="meshin-wrap">
        <Button
          type={submitButtonType || 'secondary'}
          large={buttonSizeLarge}
          className="meshin-button"
          disabled={disabled}
          onClick={handler}
          data-testid="page-container-footer-next"
        >
          Meshin
        </Button>
      </div>
    )
  }

}
