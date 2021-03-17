import axios from "axios";
import {
  ADD_CART_ITEM,
  ADD_SHIPPING_ADDRESS_REQUEST,
  ADD_SHIPPING_ADDRESS_SUCCESS,
  REMOVE_CART_ITEM,
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: ADD_CART_ITEM,
    payload: {
      _id: data._id,
      name: data.name,
      price: data.price,
      image: data.image,
      brand: data.brand,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: id });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const addShippingAddress = (data) => async (dispatch) => {
  dispatch({ type: ADD_SHIPPING_ADDRESS_REQUEST });

  dispatch({ type: ADD_SHIPPING_ADDRESS_SUCCESS, payload: data });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
