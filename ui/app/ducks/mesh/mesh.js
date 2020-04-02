import { actionConstants as actions } from '../../store/actions'

export default function reduceMesh (state = {}, action) {
  const meshState = Object.assign({
    masterKey: '',
    accessToken: '',
  }, state)

  switch (action.type) {
    case actions.SET_MESH_CREDENTIALS:
      return {
        ...meshState,
        masterKey: action.value.masterKey,
        accessToken: action.value.accessToken,
      }

    default:
      return meshState
  }
}
