import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../ui/button'

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
      console.log('handler')
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
