import log from 'loglevel'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { stripHexPrefix } from 'ethereumjs-util'
import copyToClipboard from 'copy-to-clipboard'
import { checksumAddress } from '../../../../helpers/utils/util'
import ReadOnlyInput from '../../../ui/readonly-input'
import Button from '../../../ui/button'
import AccountModalContainer from '../account-modal-container'

export default class ExportPrivateKeyModal extends Component {
  static contextTypes = {
    t: PropTypes.func,
  }

  static defaultProps = {
    warning: null,
    previousModalState: null,
  }

  static propTypes = {
    exportAccount: PropTypes.func.isRequired,
    selectedIdentity: PropTypes.object.isRequired,
    warning: PropTypes.node,
    showAccountDetailModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    previousModalState: PropTypes.string,
    getMeshDataBg: PropTypes.func,
  }

  state = {
    privateKey: '',
    showWarning: true,
  }

  componentDidMount () {
    this.getMeshCredentials().then((res) => {
      const { address } = this.props.selectedIdentity
      this.exportAccountAndGetPrivateKey(res.masterKey, address)
    })
  }

  async getMeshCredentials () {
    const data = await this.props.getMeshDataBg()
    return data
  }

  exportAccountAndGetPrivateKey = (password, address) => {
    const { exportAccount } = this.props

    exportAccount(password, address)
      .then((privateKey) => this.setState({
        privateKey,
        showWarning: false,
      }))
      .catch((e) => log.error(e))
  }

  renderPasswordLabel () {
    return (
      <span className="private-key-password-label">
        {
          this.context.t('copyPrivateKey')
        }
      </span>
    )
  }

  renderPasswordInput (privateKey) {
    const plainKey = privateKey && stripHexPrefix(privateKey)

    return (
      <ReadOnlyInput
        wrapperClass="private-key-password-display-wrapper"
        inputClass="private-key-password-display-textarea"
        textarea
        value={plainKey}
        onClick={() => copyToClipboard(plainKey)}
      />
    )
  }

  renderButtons (hideModal) {
    return (
      <div className="export-private-key-buttons">
        <Button
          onClick={() => hideModal()}
          type="secondary"
          large
          className="export-private-key__button"
        >
          {this.context.t('done')}
        </Button>
      </div>
    )
  }

  render () {
    const {
      selectedIdentity,
      warning,
      showAccountDetailModal,
      hideModal,
      previousModalState,
    } = this.props
    const { name, address } = selectedIdentity

    const {
      privateKey,
      showWarning,
    } = this.state

    return (
      <AccountModalContainer
        selectedIdentity={selectedIdentity}
        showBackButton={previousModalState === 'ACCOUNT_DETAILS'}
        backButtonAction={() => showAccountDetailModal()}
      >
        <span className="account-name">{name}</span>
        <ReadOnlyInput
          wrapperClass="ellip-address-wrapper"
          inputClass="qr-ellip-address ellip-address"
          value={checksumAddress(address)}
        />
        <div className="account-modal-divider" />
        <span className="modal-body-title">{this.context.t('showPrivateKeys')}</span>
        <div className="private-key-password">
          {this.renderPasswordLabel(privateKey)}
          {this.renderPasswordInput(privateKey)}
          {
            (showWarning && warning)
              ? <span className="private-key-password-error">{warning}</span>
              : null
          }
        </div>
        <div className="private-key-password-warning">{this.context.t('privateKeyWarning')}</div>
        {this.renderButtons(hideModal)}
      </AccountModalContainer>
    )
  }
}
