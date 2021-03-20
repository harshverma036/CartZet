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
import { Alert } from "@material-ui/lab";
import { grey } from "@material-ui/core/colors";
import Steps from "../Components/Steps";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../actions/orderActions";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, payment } = cart;

  const placeNewOrder = useSelector((state) => state.placeNewOrder);
  const { loading, newOrder, error } = placeNewOrder;

  cart.itemsPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  cart.shippingPrice = cart.itemsPrice > 999 ? 0 : 99;
  cart.taxPrice = (cart.itemsPrice * 0.18).toFixed(2);
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  useEffect(() => {
    if (newOrder) {
      history.push(`/order/${newOrder._id}`);
    }
  }, [newOrder, history]);

  const placeOrderHandler = () => {
    dispatch(
      placeOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod: payment,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <Box mt={5}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Steps step1 step2 step3 step4 />
        </Grid>
        <Grid item lg={6} md={7} xs={12}>
          <Typography variant="h4" style={{ marginBottom: 26 }}>
            Place Order
          </Typography>
          <Grid container>
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
                {`${shippingAddress.address}, ${shippingAddress.city} Pin: ${shippingAddress.pin}, ${shippingAddress.country}`}
              </Typography>
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
                Method: {payment}
              </Typography>
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
                {cartItems.map((item) => (
                  <Fragment key={item._id}>
                    <ListItem button>
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
        <Grid item lg={3} md={3} xs={12}>
          <Typography style={{ marginLeft: 11 }} variant="h4">
            Order
          </Typography>
          <List>
            <ListItem>
              <ListItemText>{"Item(s) Price:"}</ListItemText>
              <ListItemSecondaryAction>
                Rs.{cart.itemsPrice}
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem>
              <ListItemText>{"Tax Price:"}</ListItemText>
              <ListItemSecondaryAction>
                Rs.{cart.taxPrice}
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem>
              <ListItemText>{"Shipping Price:"}</ListItemText>
              <ListItemSecondaryAction>
                Rs.{cart.shippingPrice}
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem>
              <ListItemText>{"Total Price:"}</ListItemText>
              <ListItemSecondaryAction>
                Rs.{cart.totalPrice}
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem component={Box} display="flex" flexDirection="column">
              {error && (
                <Alert severity="error" style={{ marginBottom: 12 }}>
                  {error}
                </Alert>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={placeOrderHandler}
                fullWidth
                disabled={loading}
              >
                {loading && <CircularProgress color="inherit" size={20} />}
                &nbsp; &nbsp;
                {"Place Order"}
              </Button>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlaceOrderScreen;
