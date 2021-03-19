import {
  ADD_CART_ITEM,
  ADD_SHIPPING_ADDRESS_REQUEST,
  ADD_SHIPPING_ADDRESS_SUCCESS,
  REMOVE_CART_ITEM,
  ADD_PAYMENT_METHOD_SUCCESS,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, payment: "" },
  action
) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === item._id ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x._id !== action.payload),
      };
    case ADD_SHIPPING_ADDRESS_REQUEST:
      return { ...state, loading: true };
    case ADD_SHIPPING_ADDRESS_SUCCESS:
      return { ...state, loading: false, shippingAddress: action.payload };
    case ADD_PAYMENT_METHOD_SUCCESS:
      return { ...state, loading: false, payment: action.payload };
    default:
      return state;
  }
};
