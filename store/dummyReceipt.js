// action types
const ASSIGN_USER = `ASSIGN_USER`;

// initial state
const defaultReceipt = {
  receiptId: 51,
  total: 9163,
  items: [
    {
      id: 291,
      name: "meatloaf",
      price: 2487,
      quantity: 1,
      itemizedTransactions: [],
    },
    {
      id: 292,
      name: "chicken",
      price: 1922,
      quantity: 1,
      itemizedTransactions: [],
    },
    {
      id: 293,
      name: "salmon",
      price: 3127,
      quantity: 1,
      itemizedTransactions: [],
    },
    {
      id: 294,
      name: "risotto",
      price: 1982,
      quantity: 1,
      itemizedTransactions: [],
    },
    {
      id: 295,
      name: "coffee",
      price: 867,
      quantity: 1,
      itemizedTransactions: [],
    },
    {
      id: 296,
      name: "beer",
      price: 700,
      quantity: 1,
      itemizedTransactions: [],
    },
  ],
  creditor: {
    fullName: "Jerry Fake",
    creditorId: 101,
  },
};

//action creator
export const assignUser = (userId, itemIds) => {
  return { type: ASSIGN_USER, userId, itemIds };
};

// helper function
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
export default function (state = defaultReceipt, action) {
  switch (action.type) {
    case ASSIGN_USER:
      return assignUserReducer(state, action.userId, action.itemIds);
    default:
      return state;
  }
}
