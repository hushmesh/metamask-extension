import React, { PureComponent } from 'react'
import Loading from '../../components/ui/loading-screen'

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
  componentDidMount () {
    // history.push(DEFAULT_ROUTE)
    console.log('meshin did mount')
    console.log(getUrlParameter('some'))
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
