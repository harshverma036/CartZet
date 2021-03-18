import { ADD_PAYMENT_METHOD_SUCCESS } from "../constants/orderConstants";

export const addPaymentMethod = (data) => async (dispatch) => {
  dispatch({ type: ADD_PAYMENT_METHOD_SUCCESS, payload: data });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
