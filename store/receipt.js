import axios from "axios";
import { AWS_URL } from "../secrets.js";

/**
 * ACTION TYPES
 */
const ASSIGN_USER = `ASSIGN_USER`;
const MAKE_RECEIPT = "MAKE_RECEIPT";

/**
 * ACTION CREATORS
 */
export const assignUser = (userId, itemIds) => {
  return { type: ASSIGN_USER, userId, itemIds };
};

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
      console.log("aws url", AWS_URL);
      const res = await axios.post(AWS_URL + "receipts", { base64 });
      console.log(res.data.items);
      dispatch(makeReceipt(res.data));
    } catch (err) {
      console.error(err);
    }
  };
};

const assignUserReducer = (state, userId, itemIds) => {
  const updatedItems = state.items.map((item) => {
    item = { ...item };
    if (itemIds.includes(item.id)) {
      item.assignedUser = userId;
    }
    return item;
  });
  return {
    ...state,
    creditor: { ...state.creditor },
    items: updatedItems,
  };
};

/**
 * REDUCER
 */

export default function (receipt = {}, action) {
  switch (action.type) {
    case MAKE_RECEIPT:
      return action.receipt;
    case ASSIGN_USER:
      return assignUserReducer(state, action.userId, action.itemIds);
    default:
      return state;
  }
}
