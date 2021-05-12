import axios from "axios";
import {
  ALL_ORDERS_LIST_FAIL,
  ALL_ORDERS_LIST_REQUEST,
  ALL_ORDERS_LIST_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAYMENT_FAIL,
  ORDER_PAYMENT_REQUEST,
  ORDER_PAYMENT_SUCCESS,
  PLACE_NEW_ORDER_FAIL,
  PLACE_NEW_ORDER_REQUEST,
  PLACE_NEW_ORDER_SUCCESS,
  UPDATE_DELIVERY_FAIL,
  UPDATE_DELIVERY_REQUEST,
  UPDATE_DELIVERY_SUCCESS,
} from "../constants/orderConstants";

export const placeOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: PLACE_NEW_ORDER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/orders/", order, config);

    dispatch({ type: PLACE_NEW_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PLACE_NEW_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${productId}`, config);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateDelivery = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_DELIVERY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/orders/${id}`, {}, config);

    dispatch({ type: UPDATE_DELIVERY_SUCCESS });
  } catch (error) {
    dispatch({
      type: UPDATE_DELIVERY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrdersList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ALL_ORDERS_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/orders/all", config);

    dispatch({ type: ALL_ORDERS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (id, paymentInfo) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAYMENT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/orders/${id}/payment`, paymentInfo, config);

    dispatch({ type: ORDER_PAYMENT_SUCCESS });
  } catch (error) {
    dispatch({
      type: ORDER_PAYMENT_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
