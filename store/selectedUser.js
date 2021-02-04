/**
 * ACTION TYPES
 */
const SET_SELECTED_USER = "SET_SELECTED_USER";

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const setSelectedUser = (user) => ({ type: SET_SELECTED_USER, user });

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case SET_SELECTED_USER:
      return action.user;
    default:
      return state;
  }
}
