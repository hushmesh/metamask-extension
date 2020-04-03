import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MeshinButton from '../../../components/app/meshin'
import { EventEmitter } from 'events'
import Mascot from '../../../components/ui/mascot'
import { DEFAULT_ROUTE } from '../../../helpers/constants/routes'

export default class UnlockPage extends Component {
  static contextTypes = {
    metricsEvent: PropTypes.func,
    t: PropTypes.func,
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
    isUnlocked: PropTypes.bool,
  }

  submitting = false

  animationEventEmitter = new EventEmitter()

  UNSAFE_componentWillMount () {
    const { isUnlocked, history } = this.props

    if (isUnlocked) {
      history.push(DEFAULT_ROUTE)
    }
  }

  render () {
    const { t } = this.context

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
            { t('welcome') }
          </h1>
          <div>Meshin to get your metamask credentials</div>
          <div className="flow-controls-wrap">
            <MeshinButton />
          </div>
        </div>
      </div>
    )
  }
}
