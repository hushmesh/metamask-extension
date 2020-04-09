import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../ui/button'

export default class MeshinButton extends Component {

  static propTypes = {
    disabled: PropTypes.bool,
    submitButtonType: PropTypes.string,
    buttonSizeLarge: PropTypes.bool,
    history: PropTypes.object,
    getSeedFromMesh: PropTypes.func,
    getMeshCredentials: PropTypes.func,
  }

  render () {
    const {
      disabled,
      submitButtonType,
      buttonSizeLarge = false,
      getMeshCredentials,
      getSeedFromMesh,
      history,
    } = this.props

    const handler = async () => {
      await getMeshCredentials()
      getSeedFromMesh().then((res) => {
        history.push(res)
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
