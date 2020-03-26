import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Loading from '../../components/ui/loading-screen'
import { INITIALIZE_CREATE_SEED_ROUTE_MESH } from '../../helpers/constants/routes'

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
  }

  componentDidMount () {
    const { setMeshCredentials, getSeedFromMesh, history } = this.props
    const accessToken = getUrlParameter('access_token')
    const jwt = getUrlParameter('id_token')
    let masterKey = ''

    if (jwt) {
      const tokens = jwt.split('.')
      const jwtObj = JSON.parse(atob(tokens[1]))
      masterKey = jwtObj.masterKey
    }
    setMeshCredentials({ accessToken, masterKey })
    getSeedFromMesh().then((res) => {
      if (res === 'new') {
        history.push(INITIALIZE_CREATE_SEED_ROUTE_MESH)
      } else {
        // TODO: unlock
        console.log('unlock account mesh logic')
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
