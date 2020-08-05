import { actionConstants as actions } from '../../store/actions'

export default function reduceMesh (state = {}, action) {
  const meshState = Object.assign({
    relationshipKey: '',
    accessToken: '',
  }, state)

  switch (action.type) {
    case actions.SET_MESH_CREDENTIALS:
      return {
        ...meshState,
        relationshipKey: action.value.relationshipKey,
        accessToken: action.value.accessToken,
      }

    default:
      return meshState
  }
}
