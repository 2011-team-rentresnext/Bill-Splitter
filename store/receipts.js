import axios from 'axios'
import {AWS_URL} from '../secrets.js'

const defaultReceipts = []

/**
 * ACTION TYPES
 */
const SET_RECEIPTS = `SET_RECEIPTS`

/**
 * ACTION CREATORS
 */
export const setReceipts = (receipts) => {
  return {type: SET_RECEIPTS, receipts}
}

/**
 * THUNK CREATORS
 */

export const fetchReceipts = (userId) => {
  return async (dispatch) => {
    try {
      console.log('aws url is this! HERE! :  ', AWS_URL + 'receipts')
      const res = await axios.get(AWS_URL + `receipts/${userId}`)
      console.log(res.data.items)
      dispatch(makeReceipt(res.data))
    } catch (err) {
      console.error(err)
    }
  }
}

const assignUserReducer = (state, userId, itemIds) => {
  const updatedItems = state.items.map((item) => {
    item = {...item}
    if (itemIds.includes(item.id)) {
      item.assignedUser = userId
    }
    return item
  })
  return {
    ...state,
    creditor: {...state.creditor},
    items: updatedItems,
  }
}

/**
 * REDUCER
 */

export default function (receipt = defaultReceipt, action) {
  switch (action.type) {
    case MAKE_RECEIPT:
      return action.receipt
    case SET_RECEIPTS:
      return assignUserReducer(receipt, action.userId, action.itemIds)
    case CLEAR_RECEIPT:
      return defaultReceipt
    default:
      return receipt
  }
}
