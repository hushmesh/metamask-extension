import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../ui/button'
import Meshlib from './meshlib'

const meshApi = new Meshlib({
  clientId: 'XE6PJ0DhUkLXqYYnENunqdswpTw4UDGD',
  responseType: 'token_id_token',
  redirectUri: 'chrome-extension://npmgajiaihfjibkgojndemlehpalicjc/home.html#meshin-auth',
})

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
      meshApi.meshin()
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
          Dev Meshin
        </Button>
      </div>
    )
  }

}
