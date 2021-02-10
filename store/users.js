import axios from 'axios'
const apiUrl = 'https://obj3d3mu6f.execute-api.us-east-1.amazonaws.com/api/'
/**
 * ACTION TYPES
 */
const SEARCH_USERS = 'SEARCH_USERS'
const ADD_ME = 'ADD_ME'
const CLEAR_USERS = 'CLEAR_USERS'

/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */
const searchUsers = (users) => ({type: SEARCH_USERS, users})
export const addMe = (user) => ({type: ADD_ME, user})
export const clearUsers = () => ({type: CLEAR_USERS})

/**
 * THUNK CREATORS
 */
export const searchUsersThunk = (searchTerm) => async (dispatch) => {
  try {
    const res = await axios.get(`${apiUrl}users/search?name=${searchTerm}`)
    dispatch(searchUsers(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUsers, action) {
  switch (action.type) {
    case SEARCH_USERS:
      return action.users
    case ADD_ME:
      return [
        {
          ...action.user,
          firstName: 'Assign to myself',
          lastName: '',
          email: '',
        },
        ...state,
      ]
    case CLEAR_USERS:
      return defaultUsers
    default:
      return state
  }
}
