import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MeshinButton from '../../../components/app/meshin'
import { EventEmitter } from 'events'
import Mascot from '../../../components/ui/mascot'

export default class UnlockPage extends Component {
  static contextTypes = {
    metricsEvent: PropTypes.func,
    t: PropTypes.func,
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  submitting = false

  animationEventEmitter = new EventEmitter()

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
            Wrong password
          </h1>
          <div>
            <p>Your Mesh account doesn't match to the current Metamask user.</p>
          </div>

          <MeshinButton />

        </div>
      </div>
    )
  }
}
