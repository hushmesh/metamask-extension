import { connect } from 'react-redux'
import MeshFlow from './mesh-flow.component'

import {
  createNewVaultAndGetSeedPhrase,
  createNewVaultAndRestore,
  unlockAndGetSeedPhrase,
  verifySeedPhrase,
  storeSeedToMesh,
  setCompletedOnboarding,
} from '../../store/actions'
import {
  DEFAULT_ROUTE,
  INITIALIZE_BACKUP_SEED_PHRASE_ROUTE,
} from '../../helpers/constants/routes'

const mapStateToProps = (state, ownProps) => {
  const { metamask: { completedOnboarding, isInitialized, isUnlocked, seedPhraseBackedUp } } = state
  const showingSeedPhraseBackupAfterOnboarding = Boolean(ownProps.location.pathname.match(INITIALIZE_BACKUP_SEED_PHRASE_ROUTE))
  const { mesh: { masterKey } } = state

  return {
    completedOnboarding,
    isInitialized,
    isUnlocked,
    nextRoute: DEFAULT_ROUTE,
    showingSeedPhraseBackupAfterOnboarding,
    seedPhraseBackedUp,
    masterKey,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNewAccount: (password) => dispatch(createNewVaultAndGetSeedPhrase(password)),
    createNewAccountFromSeed: (password, seedPhrase) => {
      return dispatch(createNewVaultAndRestore(password, seedPhrase))
    },
    unlockAccount: (password) => dispatch(unlockAndGetSeedPhrase(password)),
    verifySeedPhrase: () => verifySeedPhrase(),
    storeSeedToMesh: (seed) => dispatch(storeSeedToMesh(seed)),
    completeOnboarding: () => dispatch(setCompletedOnboarding()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeshFlow)
