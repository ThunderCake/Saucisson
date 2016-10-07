import { movies } from 'api/'

const PREFIX = 'MOVIES'
const FETCH_REQUEST = `${PREFIX}/FETCH_REQUEST`
const FETCH_SUCCESS = `${PREFIX}/FETCH_SUCCESS`

export const fetch = () => (dispatch, getState) => {
  dispatch({ type: FETCH_REQUEST })
  movies()
    .then(({ data }) => dispatch({ type: FETCH_SUCCESS, payload: data }))
}

const initialState = {
  entries: [],
  isFetching: true
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_REQUEST:
      return { ...state, isFetching: true }
    case FETCH_SUCCESS:
      return { ...state, entries: payload, isFetching: false }
    default:
      return state
  }
}
