import axios from 'axios';
import { AWS_URL } from '../secrets.js';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  try {
    const res = await axios.get(AWS_URL + 'auth/login');
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password) => async (dispatch) => {
  let res;
  try {
    console.log('user aws url', AWS_URL);
    res = await axios.post(AWS_URL + 'auth/login', { email, password });
    dispatch(getUser(res.data));
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post(`${apiUrl}/auth/logout`);
    dispatch(removeUser());
  } catch (err) {
    console.error(err);
  }
};

export const signup = (newUser) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${apiUrl}/auth/signup`, newUser);
    dispatch(getUser(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return {};
    default:
      return state;
  }
}
