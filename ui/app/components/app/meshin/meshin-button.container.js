import MeshinButton from './meshin-button.component'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getSeedFromMesh, getMeshCredentials } from '../../../store/actions'

const mapStateToProps = (state) => {
  const { metamask: { isUnlocked, isInitialized } } = state

  return {
    isUnlocked,
    isInitialized,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSeedFromMesh: () => dispatch(getSeedFromMesh()),
    getMeshCredentials: () => dispatch(getMeshCredentials()),
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MeshinButton)
