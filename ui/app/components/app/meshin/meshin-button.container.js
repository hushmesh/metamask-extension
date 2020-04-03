import MeshinButton from './meshin-button.component'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setMeshCredentials, getSeedFromMesh, tryUnlockMetamask, createNewVaultAndRestore, setCompletedOnboarding } from '../../../store/actions'

const mapStateToProps = (state) => {
  const { metamask: { isUnlocked, isInitialized } } = state

  return {
    isUnlocked,
    isInitialized,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMeshCredentials: (credentials) => dispatch(setMeshCredentials(credentials)),
    getSeedFromMesh: () => dispatch(getSeedFromMesh()),
    tryUnlockMetamask: (password) => dispatch(tryUnlockMetamask(password)),
    createNewAccountFromSeed: (password, seedPhrase) => {
      return dispatch(createNewVaultAndRestore(password, seedPhrase))
    },
    completeOnboarding: () => dispatch(setCompletedOnboarding()),
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MeshinButton)
