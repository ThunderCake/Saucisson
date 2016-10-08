const PREFIX = 'KEYBOARD'

const SELECT = `${PREFIX}/SELECT`
export const keyboardSelect = id => (dispatch, getState) =>
  dispatch({ type: SELECT, payload: parseInt(id) })

const REGISTER = `${PREFIX}/REGISTER`
export const register = id => (dispatch, getState) => {
  const { keyboard: { registred } } = getState()
  dispatch({ type: REGISTER, payload: registred + 1 })
}

const UNREGISTER = `${PREFIX}/UNREGISTER`
export const unregister = id => (dispatch, getState) => {
  const { keyboard: { registred } } = getState()
  dispatch({ type: UNREGISTER, payload: registred - 1 })
}

const KEYDOWN = `${PREFIX}/KEYDOWN`
export const keydown = id => (dispatch, getState) =>
  dispatch({ type: KEYDOWN })

const KEYUP = `${PREFIX}/KEYUP`
export const keyup = id => (dispatch, getState) =>
  dispatch({ type: KEYUP })

const initialState = {
  registred: 0,
  selected: 0,
  keypress: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case KEYDOWN:
      return { ...state, ...{ keypress: true } }
    case KEYUP:
      return { ...state, ...{ keypress: false } }
    case REGISTER:
    case UNREGISTER:
      return { ...state, ...{ registred: payload } }
    case SELECT:
      return { ...state, ...{ selected: payload } }
    default:
      return state
  }
}
