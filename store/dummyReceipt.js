const defaultReceipt = {
  receiptId: 1,
  total: 9163,
  items: [
    {
      itemId: 3,
      name: "meatloaf",
      price: 2487,
      quantity: 1,
      itemizedTransactions: [],
    },
    {
      itemId: 2,
      name: "chicken",
      price: 1922,
      quantity: 1,
      itemizedTransactions: [],
    },
    {
      itemId: 5,
      name: "salmon",
      price: 3127,
      quantity: 1,
      itemizedTransactions: [],
    },
    {
      itemId: 6,
      name: "risotto",
      price: 1982,
      quantity: 1,
      itemizedTransactions: [],
    },
    {
      itemId: 4,
      name: "coffee",
      price: 867,
      quantity: 1,
      itemizedTransactions: [],
    },
    {
      itemId: 1,
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

/**
 * REDUCER
 */
export default function (state = defaultReceipt, action) {
  switch (action.type) {
    default:
      return state;
  }
}
