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
      const res = await axios.get(AWS_URL + `receipts/history`)
      console.log(res.data)
      dispatch(setReceipts(res.data))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */

export default function (receipts = defaultReceipts, action) {
  switch (action.type) {
    case SET_RECEIPTS:
      return action.receipts
    default:
      return receipts
  }
}
