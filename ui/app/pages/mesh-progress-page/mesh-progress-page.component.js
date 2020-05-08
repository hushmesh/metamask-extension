import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MeshinButton from '../../components/app/meshin'
import getCaretCoordinates from 'textarea-caret'
import { EventEmitter } from 'events'
import Mascot from '../../components/ui/mascot'
import { DEFAULT_ROUTE, UNLOCK_ROUTE } from '../../helpers/constants/routes'

export default class UnlockPage extends Component {
  static contextTypes = {
    metricsEvent: PropTypes.func,
    t: PropTypes.func,
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
    isUnlocked: PropTypes.bool,
    onImport: PropTypes.func,
    onRestore: PropTypes.func,
    onSubmit: PropTypes.func,
    forceUpdateMetamaskState: PropTypes.func,
    showOptInModal: PropTypes.func,
    getMeshCredentials: PropTypes.func,
    getSeedFromMesh: PropTypes.func,
  }

  state = {
    password: '',
    error: null,
  }

  submitting = false

  animationEventEmitter = new EventEmitter()

  UNSAFE_componentWillMount () {
    const { isUnlocked, history } = this.props

    if (isUnlocked) {
      history.push(DEFAULT_ROUTE)
    }
  }

  componentDidMount () {
    this.meshin()
  }

  meshin = async () => {
    const {
      getMeshCredentials,
      getSeedFromMesh,
      history,
    } = this.props
    try {
      await getMeshCredentials()
    } catch (err) {
      history.push(UNLOCK_ROUTE)
      return
    }
    getSeedFromMesh().then((res) => {
      history.push(res)
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    const { password } = this.state
    const { onSubmit, forceUpdateMetamaskState, showOptInModal } = this.props

    if (password === '' || this.submitting) {
      return
    }

    this.setState({ error: null })
    this.submitting = true

    try {
      await onSubmit(password)
      const newState = await forceUpdateMetamaskState()
      this.context.metricsEvent({
        eventOpts: {
          category: 'Navigation',
          action: 'Unlock',
          name: 'Success',
        },
        isNewVisit: true,
      })

      if (newState.participateInMetaMetrics === null || newState.participateInMetaMetrics === undefined) {
        showOptInModal()
      }
    } catch ({ message }) {
      if (message === 'Incorrect password') {
        const newState = await forceUpdateMetamaskState()
        this.context.metricsEvent({
          eventOpts: {
            category: 'Navigation',
            action: 'Unlock',
            name: 'Incorrect Passowrd',
          },
          customVariables: {
            numberOfTokens: newState.tokens.length,
            numberOfAccounts: Object.keys(newState.accounts).length,
          },
        })
      }

      this.setState({ error: message })
      this.submitting = false
    }
  }

  handleInputChange ({ target }) {
    this.setState({ password: target.value, error: null })

    // tell mascot to look at page action
    if (target.getBoundingClientRect) {
      const element = target
      const boundingRect = element.getBoundingClientRect()
      const coordinates = getCaretCoordinates(element, element.selectionEnd)
      this.animationEventEmitter.emit('point', {
        x: boundingRect.left + coordinates.left - element.scrollLeft,
        y: boundingRect.top + coordinates.top - element.scrollTop,
      })
    }
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
          <h1 className="mesh-flow__title meshin-progress__title">
            Accessing Your Wallet...
          </h1>
          <div className="mesh-flow__message">
            <p>
              Snap the meshtag to continue.
            </p>
          </div>

          <div className="mesh-flow__footer">
            <img className="mesh-powered" src="images/powered-mesh.svg" height={20} alt="powered by meshin" title="Powered by Mesh in" />
          </div>
        </div>
      </div>
    )
  }
}
