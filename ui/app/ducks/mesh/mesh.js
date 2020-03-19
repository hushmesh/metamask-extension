// import { actionConstants as actions } from '../../store/actions'

export default function reduceMesh (state = {}, action) {
  const meshState = Object.assign({
    masterKey: 'testkey',
    accessToken: 'testtoken',
  }, state)

  switch (action.type) {

    // case actions.UPDATE_MESH_STATE:
    //   return { ...meshState, ...action.value }

    default:
      return meshState
  }
}
