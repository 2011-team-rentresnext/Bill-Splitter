import axios from 'axios'
import {AWS_URL} from '../secrets.js'

const defaultReceipt = {
  items: [],
}

/**
 * ACTION TYPES
 */
const ASSIGN_USER = `ASSIGN_USER`
const MAKE_RECEIPT = 'MAKE_RECEIPT'
const CLEAR_RECEIPT = 'CLEAR_RECEIPT'
const GET_RECEIPT = `GET_RECEIPT`

/**
 * ACTION CREATORS
 */
export const assignUser = (userId, itemIds) => {
  return {type: ASSIGN_USER, userId, itemIds}
}

export const clearReceipt = () => {
  return {type: CLEAR_RECEIPT}
}

const makeReceipt = (receipt) => {
  return {
    type: MAKE_RECEIPT,
    receipt,
  }
}

const getReceipt = (receipt) => {
  return {
    type: GET_RECEIPT,
    receipt,
  }
}

/**
 * THUNK CREATORS
 */

export const scanReceipt = (base64) => {
  return async (dispatch) => {
    try {
      console.log(`SCAN RECEIPT!!!`)
      const res = await axios.post(AWS_URL + 'receipts', {base64})
      console.log(res.data.items)
      dispatch(makeReceipt(res.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchReceipt = (receiptId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(AWS_URL + 'receipts/' + receiptId)
      dispatch(getReceipt(res.data))
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
    case ASSIGN_USER:
      return assignUserReducer(receipt, action.userId, action.itemIds)
    case CLEAR_RECEIPT:
      return defaultReceipt
    case GET_RECEIPT:
      return action.receipt
    default:
      return receipt
  }
}
