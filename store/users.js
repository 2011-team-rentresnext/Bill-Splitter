import axios from "axios";
const apiUrl = "https://obj3d3mu6f.execute-api.us-east-1.amazonaws.com/api/";
/**
 * ACTION TYPES
 */
const SEARCH_USERS = "SEARCH_USERS";

/**
 * INITIAL STATE
 */
const defaultUsers = [];

/**
 * ACTION CREATORS
 */
const searchUsers = (users) => ({ type: SEARCH_USERS, users });

/**
 * THUNK CREATORS
 */
export const searchUsersThunk = (searchTerm) => async (dispatch) => {
  try {
    const res = await axios.get(`${apiUrl}users/search?name=${searchTerm}`);
    dispatch(searchUsers(res.data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function (state = defaultUsers, action) {
  switch (action.type) {
    case SEARCH_USERS:
      return action.users;
    default:
      return state;
  }
}
