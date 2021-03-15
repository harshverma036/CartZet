import React, { Fragment, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  List,
  ListItem,
  Typography,
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";

const CartScreen = ({ location, match }) => {
  const dispatch = useDispatch();
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => dispatch(removeFromCart(id));

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <Box mt={3}>
      <Button variant="outlined" color="default" component={Link} to="/">
        Go Back
      </Button>
      <Typography variant="h3" style={{ marginBottom: 14, marginTop: 14 }}>
        Cart
      </Typography>
      <Grid container>
        <Grid item lg={9} md={8} xs={12}>
          <List>
            {cartItems.length === 0 && (
              <Alert severity="info">{"Cart is empty."}</Alert>
            )}
            {cartItems.map((item) => (
              <Fragment key={item._id}>
                <ListItem button component={Link} to={`/product/${item._id}`}>
                  <ListItemAvatar>
                    <Avatar alt={item.name} src={item.image} />
                  </ListItemAvatar>
                  <ListItemText primary={item.name} secondary={item.brand} />
                  <ListItemSecondaryAction>
                    <FormControl variant="outlined" style={{ marginRight: 18 }}>
                      <InputLabel id="qty">Qunatity</InputLabel>
                      <Select
                        labelId="qty"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(addToCart(item._id, Number(e.target.value)))
                        }
                        id="qty"
                        label="Qunatity"
                      >
                        {[...Array(item.countInStock).keys()].map((q) => (
                          <MenuItem value={q + 1} key={q + 1}>
                            {q + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <IconButton
                      edge="end"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Fragment>
            ))}
          </List>
        </Grid>
        <Grid item lg={3} md={4} xs={12}>
          <List>
            <ListItem component={Typography} variant="h5">
              Cart Items
            </ListItem>
            <Divider />
            <ListItem component={Typography} variant="h6">
              Total Items: {cartItems.reduce((acc, i) => acc + i.qty, 0)}
            </ListItem>
            <ListItem component={Typography} variant="h6">
              Total Price:{" "}
              {cartItems
                .reduce((acc, i) => acc + i.qty * i.price, 0)
                .toFixed(2)}
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                size="large"
                color="primary"
                variant="contained"
                disabled={cartItems.length === 0}
              >
                Proceed to checkout
              </Button>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartScreen;
