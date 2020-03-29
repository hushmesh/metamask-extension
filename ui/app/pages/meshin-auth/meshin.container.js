import Meshin from './meshin.component'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setMeshCredentials, getSeedFromMesh, tryUnlockMetamask } from '../../store/actions'

const mapStateToProps = (state) => {
  const { metamask: { isUnlocked } } = state

  return {
    isUnlocked,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMeshCredentials: (credentials) => dispatch(setMeshCredentials(credentials)),
    getSeedFromMesh: () => dispatch(getSeedFromMesh()),
    tryUnlockMetamask: (password) => dispatch(tryUnlockMetamask(password)),
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Meshin)
