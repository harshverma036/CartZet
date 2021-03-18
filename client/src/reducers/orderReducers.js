import { ADD_PAYMENT_METHOD_SUCCESS } from "../constants/orderConstants";

export const paymentMethodReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PAYMENT_METHOD_SUCCESS:
      return { patmentMethod: action.payload };
    default:
      return state;
  }
};
