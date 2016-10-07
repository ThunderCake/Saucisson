const PREFIX = 'KEYBOARD'

import { KEYCODE_ARROW_LEFT, KEYCODE_ARROW_RIGHT } from 'utils/';

const EVENT = `${PREFIX}/EVENT`
export const keyboardEvent = id => (dispatch, getState) => {
  dispatch({ type: EVENT, payload: parseInt(id) })
}

const REGISTER = `${PREFIX}/REGISTER`
export const register = id => (dispatch, getState) => {
  const { keyboard: { registred } } = getState()
  dispatch({ type: REGISTER, payload: registred + 1 })
}

const initialState = {
  registred: 0,
  selected: 0
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER:
      return { ...state, ...{ registred: payload } }
    case EVENT:
      return { ...state, ...{ selected: payload } }
    default:
      return state
  }
}
