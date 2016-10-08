import Config from 'electron-config'
const config = new Config()

const PREFIX = 'SETTINGS'

const CHANGE = `${PREFIX}/CHANGE`
export const set = (key, value) => (dispatch, getState) => {
  config.set(key, value)
  dispatch({ type: CHANGE, payload: config.store })
}

const initialState = config.store

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE:
      return { ...state, ...payload }
    default:
      return state
  }
}
