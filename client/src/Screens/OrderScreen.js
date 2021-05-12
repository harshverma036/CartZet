import React, { Fragment, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  Button,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { grey } from "@material-ui/core/colors";
import Loader from "../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  updateDelivery,
  payOrder,
} from "../actions/orderActions";
import { ORDER_PAYMENT_RESET } from "../constants/orderConstants";

const OrderScreen = ({ history, match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const orderPayment = useSelector((state) => state.orderPayment);
  const {
    loading: paymentLoading,
    success: paymentSuccess,
    error: paymentError,
  } = orderPayment;

  const orderDelivery = useSelector((state) => state.orderDelivery);
  const {
    loading: deliveryLoading,
    success: deliverySuccess,
    error: deliveryError,
  } = orderDelivery;

  useEffect(() => {
    dispatch({ type: ORDER_PAYMENT_RESET });
    if (!userInfo) {
      history.push("/login");
    }

    const paypalScript = async () => {
      const { data } = await axios.get("/paypal");
      console.log(data);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      document.body.appendChild(script);
    };

    paypalScript();
    if (deliverySuccess || paymentSuccess) {
      dispatch(getOrderDetails(orderId));
    }
    dispatch(getOrderDetails(orderId));
  }, [userInfo, history, dispatch, orderId, deliverySuccess, paymentSuccess]);

  const updateDeliveryHandler = () => {
    dispatch(updateDelivery(orderId));
  };

  const paymentSuccessHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Alert severity="error">{error}</Alert>
  ) : (
    <Box mt={5}>
      <Grid container justify="center">
        <Grid item md={7} xs={12}>
          <Typography variant="h5" style={{ marginBottom: 26 }}>
            ORDER ID {order._id}
          </Typography>
          <Grid container>
            <Grid
              component={Box}
              display="flex"
              flexDirection="column"
              item
              xs={12}
            >
              <Typography variant="h6">Customer</Typography>
              <Typography
                paragraph
                style={{ color: grey[600], marginBottom: 0 }}
              >
                Name: {order.user.name}
              </Typography>
              <Typography
                component="a"
                paragraph
                href={`mailto:${order.user.email}`}
                style={{ color: grey[700], paddingTop: 0 }}
              >
                Email: {order.user.email}
              </Typography>
            </Grid>
            <Grid
              component={Box}
              display="flex"
              flexDirection="column"
              item
              xs={12}
            >
              <Typography variant="h6">Shipping</Typography>
              <Typography paragraph style={{ color: grey[600] }}>
                Address:{" "}
                {`${order.shippingAddress.address}, ${order.shippingAddress.city} Pin: ${order.shippingAddress.pin}, ${order.shippingAddress.country}`}
              </Typography>
              <Alert
                style={{ marginBottom: 12 }}
                severity={order.isDelivered ? "success" : "error"}
              >
                {order.isDelivered ? order.deliveredAt : "Not delivered yet"}
              </Alert>
            </Grid>
            <Divider />
            <Grid
              item
              component={Box}
              display="flex"
              flexDirection="column"
              xs={12}
            >
              <Typography variant="h6">Payment Method</Typography>
              <Typography paragraph style={{ color: grey[600] }}>
                Method: {order.paymentMethod}
              </Typography>
              <Alert
                style={{ marginBottom: 12 }}
                severity={order.isPaid ? "success" : "error"}
              >
                {order.isPaid ? order.paidAt : "Not paid yet"}
              </Alert>
            </Grid>
            <Divider />
            <Grid
              item
              component={Box}
              display="flex"
              flexDirection="column"
              xs={12}
            >
              <Typography variant="h5">Order Items</Typography>
              <List>
                {order.orderItems.map((item) => (
                  <Fragment key={item._id}>
                    <ListItem
                      button
                      component={Link}
                      to={`/product/${item.product}`}
                    >
                      <ListItemAvatar>
                        <Avatar alt={item.name} src={item.image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name}
                        secondary={item.brand}
                      />
                    </ListItem>
                  </Fragment>
                ))}
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={3} xs={12}>
          <Typography style={{ marginLeft: 11 }} variant="h4">
            Order
          </Typography>
          <List>
            <ListItem>
              <ListItemText>{"Item(s) Price:"}</ListItemText>
              <ListItemSecondaryAction>
                Rs.{order.itemsPrice}
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem>
              <ListItemText>{"Tax Price:"}</ListItemText>
              <ListItemSecondaryAction>
                Rs.{order.taxPrice}
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem>
              <ListItemText>{"Shipping Price:"}</ListItemText>
              <ListItemSecondaryAction>
                Rs.{order.shippingPrice}
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem>
              <ListItemText>{"Total Price:"}</ListItemText>
              <ListItemSecondaryAction>
                Rs.{order.totalPrice}
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem component={Box} display="flex" flexDirection="column">
              {deliveryError && (
                <Alert severity="error" style={{ marginBottom: 12 }}>
                  {deliveryError}
                </Alert>
              )}

              {userInfo && (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={updateDeliveryHandler}
                  disabled={deliveryLoading || order.isDelivered}
                  style={{ display: userInfo.isAdmin ? "block" : "none" }}
                >
                  {deliveryLoading && (
                    <CircularProgress color="inherit" size={20} />
                  )}
                  &nbsp; &nbsp;
                  {"Mark As Delivered"}
                </Button>
              )}
            </ListItem>
            <ListItem component={Box} display="flex" flexDirection="column">
              {paymentLoading && <Loader />}
              {paymentError && <Alert severity="error">{error}</Alert>}
              {!order.isPaid && (
                <PayPalButton
                  amount={order.totalPrice}
                  onSuccess={paymentSuccessHandler}
                />
              )}
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderScreen;
