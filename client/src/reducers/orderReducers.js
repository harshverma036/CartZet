import {
  ALL_ORDERS_LIST_FAIL,
  ALL_ORDERS_LIST_REQUEST,
  ALL_ORDERS_LIST_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  PLACE_NEW_ORDER_FAIL,
  PLACE_NEW_ORDER_REQUEST,
  PLACE_NEW_ORDER_SUCCESS,
  UPDATE_DELIVERY_FAIL,
  UPDATE_DELIVERY_REQUEST,
  UPDATE_DELIVERY_RESET,
  UPDATE_DELIVERY_SUCCESS,
  USER_ORDERS_LIST_FAIL,
  USER_ORDERS_LIST_REQUEST,
  USER_ORDERS_LIST_SUCCESS,
} from "../constants/orderConstants";

export const placeNewOrderReducer = (
  state = { orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case PLACE_NEW_ORDER_REQUEST:
      return { loading: true };
    case PLACE_NEW_ORDER_SUCCESS:
      return { loading: false, newOrder: action.payload };
    case PLACE_NEW_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDeliveryReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DELIVERY_REQUEST:
      return { loading: true };
    case UPDATE_DELIVERY_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_DELIVERY_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_DELIVERY_RESET:
      return {};
    default:
      return state;
  }
};

export const userOrdersListReducer = (
  state = { orders: [], shippingAddress: {}, orderItems: [] },
  action
) => {
  switch (action.type) {
    case USER_ORDERS_LIST_REQUEST:
      return { loading: true };
    case USER_ORDERS_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case USER_ORDERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ordersListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDERS_LIST_REQUEST:
      return { loading: true };
    case ALL_ORDERS_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ALL_ORDERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
