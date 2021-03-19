import {
  PLACE_NEW_ORDER_FAIL,
  PLACE_NEW_ORDER_REQUEST,
  PLACE_NEW_ORDER_SUCCESS,
} from "../constants/orderConstants";

export const placeNewOrderReducer = (
  state = { orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case PLACE_NEW_ORDER_REQUEST:
      return { loading: true };
    case PLACE_NEW_ORDER_SUCCESS:
      return { loading: false, placedOrder: action.payload };
    case PLACE_NEW_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
