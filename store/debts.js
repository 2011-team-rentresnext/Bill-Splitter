import axios from "axios";
import { AWS_URL } from "../secrets.js";

/**
 * ACTION TYPES
 */

const GET_USER_DEBTS= "GET_USER_DEBTS"

/**
 * INITIAL STATE
 */
const userDebts = [];

/**
 * ACTION CREATORS
 */
const getDebts = (debts) => ({ 
    type: GET_USER_DEBTS,
    debts
});

/**
 * THUNK CREATORS
 */
export const getUserDebts = (userId) => async (dispatch) => {  
    try {
        const { data } = await axios.get(`${AWS_URL}/users/${userId}/debts`);

        dispatch(getDebts(data));

    } catch (err) {
        console.error(err);
    }
};

/**
 * REDUCER
 */
export default function (state = userDebts, action) {
  switch (action.type) {
    case GET_USER_DEBTS:
      return action.debts;
    default:
      return state;
  }
}