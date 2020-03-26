import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import MeshInit from './mesh-init/mesh-init.component'
import MeshCreateSeed from './mesh-create-seed/mesh-create-seed.component'

import {
  DEFAULT_ROUTE,
  INITIALIZE_CREATE_SEED_ROUTE_MESH,
  INITIALIZE_UNLOCK_ROUTE_MESH,
} from '../../helpers/constants/routes'

export default class MeshFlow extends PureComponent {
  static propTypes = {
    completedOnboarding: PropTypes.bool,
    createNewAccount: PropTypes.func,
    createNewAccountFromSeed: PropTypes.func,
    history: PropTypes.object,
    isInitialized: PropTypes.bool,
    isUnlocked: PropTypes.bool,
    masterKey: PropTypes.string,
    unlockAccount: PropTypes.func,
    nextRoute: PropTypes.string,
    showingSeedPhraseBackupAfterOnboarding: PropTypes.bool,
    seedPhraseBackedUp: PropTypes.bool,
    verifySeedPhrase: PropTypes.func,
    storeSeedToMesh: PropTypes.func,
    completeOnboarding: PropTypes.func,
  }

  state = {
    seedPhrase: '',
    isImportedKeyring: false,
  }

  componentDidMount () {
    const {
      completedOnboarding,
      history,
      isInitialized,
      isUnlocked,
      showingSeedPhraseBackupAfterOnboarding,
      seedPhraseBackedUp,
    } = this.props

    if (completedOnboarding && (!showingSeedPhraseBackupAfterOnboarding || seedPhraseBackedUp)) {
      history.push(DEFAULT_ROUTE)
      return
    }

    if (isInitialized && !isUnlocked) {
      history.push(INITIALIZE_UNLOCK_ROUTE_MESH)
      return
    }
  }

  handleCreateNewAccount = async () => {
    const { createNewAccount, storeSeedToMesh, completeOnboarding, masterKey, history } = this.props
    console.log('handleCreateNewAccount')
    try {
      const seedPhrase = await createNewAccount(masterKey)
      storeSeedToMesh(seedPhrase)
      await completeOnboarding()
      history.push(DEFAULT_ROUTE)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  handleImportWithSeedPhrase = async (password, seedPhrase) => {
    const { createNewAccountFromSeed } = this.props

    try {
      const vault = await createNewAccountFromSeed(password, seedPhrase)
      this.setState({ isImportedKeyring: true })
      return vault
    } catch (error) {
      throw new Error(error.message)
    }
  }

  handleUnlock = async (password) => {
    const { unlockAccount, history, nextRoute } = this.props

    try {
      const seedPhrase = await unlockAccount(password)
      this.setState({ seedPhrase }, () => {
        history.push(nextRoute)
      })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  render () {
    const { isImportedKeyring } = this.state

    return (
      <div className="first-time-flow">
        <h1>Meshin flow</h1>
        <Switch>
          <Route
            path={INITIALIZE_UNLOCK_ROUTE_MESH}
            render={(routeProps) => (
              <MeshInit
                { ...routeProps }
                onUnlock={this.handleUnlock}
              />
            )}
          />
          <Route
            path={INITIALIZE_CREATE_SEED_ROUTE_MESH}
            render={(routeProps) => (
              <MeshCreateSeed
                { ...routeProps }
                isImportedKeyring={isImportedKeyring}
                onCreateNewAccount={this.handleCreateNewAccount}
                onCreateNewAccountFromSeed={this.handleImportWithSeedPhrase}
              />
            )}
          />
        </Switch>
      </div>
    )
  }
}
