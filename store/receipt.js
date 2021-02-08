import axios from "axios";
import { AWS_URL } from "../secrets.js";

/**
 * ACTION TYPES
 */

const MAKE_RECEIPT = "MAKE_RECEIPT";

/**
 * ACTION CREATORS
 */

const makeReceipt = (receipt) => {
  return {
    type: MAKE_RECEIPT,
    receipt,
  };
};

/**
 * THUNK CREATORS
 */

export const scanReceipt = (base64) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(AWS_URL + "receipts", { base64 });
      dispatch(makeReceipt(res.data));
    } catch (err) {
      console.error(err);
    }
  };
};

/**
 * REDUCER
 */

export default function (state = {}, action) {
  switch (action.type) {
    case MAKE_RECEIPT:
      return action.receipt;
    default:
      return state;
  }
}
