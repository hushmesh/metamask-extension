import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../../components/ui/button'
import { EventEmitter } from 'events'
import Mascot from '../../../components/ui/mascot'

export default class UnlockPage extends Component {
  static contextTypes = {
    metricsEvent: PropTypes.func,
    t: PropTypes.func,
  }

  static propTypes = {
    onCreateNewAccount: PropTypes.func,
    history: PropTypes.object.isRequired,
  }

  submitting = false

  animationEventEmitter = new EventEmitter()

  handleCreate = () => {
    this.props.onCreateNewAccount()
  }

  render () {

    return (
      <div className="unlock-page__container">
        <div className="create-wallet-page mesh-flow__page">
          <div className="unlock-page__mascot-container">
            <Mascot
              animationEventEmitter={this.animationEventEmitter}
              width="120"
              height="120"
            />
          </div>
          <h1 className="mesh-flow__title">
            Create a New Wallet
          </h1>
          <div className="mesh-flow__message create-seed__message">
            <p style={{ marginBottom: '30px' }}>
              A new MetaMask wallet and seed phrase will be created for you.
            </p>
            <p>But you won't have to worry about how to manage your seed phrase or private key. The mesh will handle all of that safely and securely for you. Best of all, you don't need to create another password for MetaMask.</p>
          </div>

          <div className="flow-controls-wrap">
            <Button
              type="primary"
              className="first-time-flow__button mesh-color-button"
              onClick={this.handleCreate}
            >
              Create My Wallet
            </Button>
          </div>
          <div className="mesh-flow__footer">
            <img className="mesh-powered" src="images/powered-mesh.svg" height={20} alt="powered by meshin" title="Powered by Mesh in" />
          </div>
        </div>
      </div>
    )
  }
}
