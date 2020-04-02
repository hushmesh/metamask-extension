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
        <div className="unlock-page">
          <div className="unlock-page__mascot-container">
            <Mascot
              animationEventEmitter={this.animationEventEmitter}
              width="120"
              height="120"
            />
          </div>
          <h1 className="unlock-page__title">
            Create new Seed
          </h1>
          <div>
            <p>You don't have metamask credentials in your mesh account. Do you want to create new account and store it in the Mesh?</p>
          </div>

          <Button
            type="primary"
            className="first-time-flow__button"
            onClick={this.handleCreate}
          >
            Create new Account
          </Button>
        </div>
      </div>
    )
  }
}
