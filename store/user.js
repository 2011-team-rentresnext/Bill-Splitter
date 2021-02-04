import axios from "axios";
const apiUrl = "https://obj3d3mu6f.execute-api.us-east-1.amazonaws.com/api/";
/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER";

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({ type: GET_USER, user });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  try {
    const res = await axios.get(apiUrl + "auth/login");
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password) => async (dispatch) => {
  let res;
  try {
    res = await axios.post(apiUrl + "auth/login", { email, password });
    dispatch(getUser(res.data));
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  // try {
  //   dispatch(getUser(res.data));
  //   // history.push('/home'); check how this works in RNative
  // } catch (dispatchOrHistoryErr) {
  //   console.error(dispatchOrHistoryErr);
  // }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post("/auth/logout");
    dispatch(removeUser());
    history.push("/login");
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
    default:
      return state;
  }
}
