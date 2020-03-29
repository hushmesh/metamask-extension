import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../ui/button'

const getAuthUrl = (options) => {
  const BASE_URL = 'https://api-dev.hshm.sh/v0/init'
  const { responseType, clientId, redirectUri } = options
  const url = `${BASE_URL}?&response_type=${responseType}&client_id=${clientId}&redirect_uri=` + encodeURIComponent(redirectUri)
  return url
}

export default class MeshinButton extends Component {

  static propTypes = {
    disabled: PropTypes.bool,
    submitButtonType: PropTypes.string,
    buttonSizeLarge: PropTypes.bool,
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
