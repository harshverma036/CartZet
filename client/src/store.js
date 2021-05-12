import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsListReducer,
  productDetailsReducer,
  createNewProductReducer,
  deleteProductReducer,
  updateProductReducer,
  reviewsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userProfileDetailsReducer,
  userProfileUpdateReducer,
  listUsersReducer,
  userDetailsReducer,
  updateUserReducer,
} from "./reducers/userReducers";
import {
  placeNewOrderReducer,
  orderDetailsReducer,
  orderDeliveryReducer,
  userOrdersListReducer,
  ordersListReducer,
  orderPaymentReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  productsList: productsListReducer,
  productDetails: productDetailsReducer,
  reviews: reviewsReducer,
  createNewProduct: createNewProductReducer,
  deleteProduct: deleteProductReducer,
  updateProduct: updateProductReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfileDetails: userProfileDetailsReducer,
  userProfileUpdate: userProfileUpdateReducer,
  userDetails: userDetailsReducer,
  updateUser: updateUserReducer,
  listUsers: listUsersReducer,
  userOrdersList: userOrdersListReducer,
  placeNewOrder: placeNewOrderReducer,
  orderDetails: orderDetailsReducer,
  orderDelivery: orderDeliveryReducer,
  ordersList: ordersListReducer,
  orderPayment: orderPaymentReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? localStorage.getItem("paymentMethod")
  : "";

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    payment: paymentMethodFromStorage,
  },
};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
