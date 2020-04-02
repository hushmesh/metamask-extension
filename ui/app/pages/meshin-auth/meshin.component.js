import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Loading from '../../components/ui/loading-screen'
import { INITIALIZE_CREATE_SEED_ROUTE_MESH, INITIALIZE_MESH_WRONG_PASSWORD, DEFAULT_ROUTE } from '../../helpers/constants/routes'

function getUrlParameter (name, url) {
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

export default class Meshin extends PureComponent {
  static propTypes = {
    history: PropTypes.object,
    setMeshCredentials: PropTypes.func,
    getSeedFromMesh: PropTypes.func,
    createNewAccountFromSeed: PropTypes.func,
    tryUnlockMetamask: PropTypes.func,
    completeOnboarding: PropTypes.func,
    isInitialized: PropTypes.bool,
  }

  componentDidMount () {
    const { isInitialized, setMeshCredentials, getSeedFromMesh, history, tryUnlockMetamask, createNewAccountFromSeed, completeOnboarding } = this.props
    const accessToken = getUrlParameter('access_token')
    const jwt = getUrlParameter('id_token')
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
            history.push(INITIALIZE_MESH_WRONG_PASSWORD)
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
    return (
      <div>
        <h1>Meshin Auth</h1>
        <Loading />
      </div>
    )
  }
}
