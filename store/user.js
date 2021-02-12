import axios from 'axios'
import {AWS_URL} from '../secrets.js'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateNotifications = (hasOutstandingDebts) => ({
  type: UPDATE_NOTIFICATIONS,
  hasOutstandingDebts,
})
/**
 * THUNK CREATORS
 */
export const getMe = () => async (dispatch) => {
  try {
    const res = await axios.get(AWS_URL + 'auth/login')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password) => async (dispatch) => {
  let res
  try {
    console.log('user aws url', AWS_URL)
    res = await axios.post(AWS_URL + 'auth/login', {email, password})
    dispatch(getUser(res.data))
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
}

export const logout = () => async (dispatch) => {
  try {
    await axios.post(`${AWS_URL}/auth/logout`)
    dispatch(removeUser())
  } catch (err) {
    console.error(err)
  }
}

export const signup = (newUser) => async (dispatch) => {
  try {
    const {data} = await axios.post(`${AWS_URL}/auth/signup`, newUser)
    dispatch(getUser(data))
  } catch (err) {
    console.error(err)
  }
}

export const checkNotifications = (userId) => async (dispatch) => {
  try {
    const {data} = await axios.get(`${AWS_URL}/users/${userId}/notifications`)
    dispatch(updateNotifications(data.hasOutstandingDebts))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return {}
    case UPDATE_NOTIFICATIONS:
      return {...state, hasOutstandingDebts: action.hasOutstandingDebts}
    default:
      return state
  }
}
