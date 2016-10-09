import { movies } from 'api/'
import { equals } from 'ramda'

const PREFIX = 'MOVIES'
const FETCH_REQUEST = `${PREFIX}/FETCH_REQUEST`
const FETCH_SUCCESS = `${PREFIX}/FETCH_SUCCESS`

export const fetch = () => (dispatch, getState) => {
  dispatch({ type: FETCH_REQUEST })
  movies()
    .then(({ data }) => dispatch({ type: FETCH_SUCCESS, payload: data }))
}
const SET = `${PREFIX}/SET`
export const set = movie => (dispatch, getState) => {
  const { movies: { selected } } = getState()
  if (!equals(selected, movie)) {
    dispatch({ type: SET, payload: movie })
  }
}

const initialState = {
  entries: [],
  isFetching: true,
  selected: {}
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_REQUEST:
      return { ...state, isFetching: true }
    case FETCH_SUCCESS:
      return { ...state, entries: payload, isFetching: false }
    case SET:
      return { ...state, selected: payload }
    default:
      return state
  }
}
