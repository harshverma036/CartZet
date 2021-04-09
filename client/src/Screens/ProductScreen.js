import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  List,
  Button,
  Typography,
  ListItem,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import { getProductDetails } from "../actions/productActions";
import { Link } from "react-router-dom";

const ProductScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const productId = match.params.id;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    console.log("Submited...");
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <p>{error}</p>
  ) : (
    <Box mt={3}>
      <Button
        style={{ marginBottom: 20 }}
        variant="outlined"
        color="default"
        component={Link}
        to="/"
      >
        Go Back
      </Button>
      <Grid container spacing={4}>
        <Grid item md={6}>
          <Box
            component="img"
            alt={product.name}
            src={product.image}
            title={product.name}
            maxWidth="100%"
            mb={2}
          />
          <Typography>
            {product.brand}, {product.category}
          </Typography>
          <List>
            <ListItem>
              <Typography variant="h5">{"Reviews"}</Typography>
            </ListItem>
            <ListItem style={{ marginBottom: 10 }}>
              {userInfo ? (
                <Box
                  component="form"
                  onSubmit={reviewSubmitHandler}
                  width="100%"
                >
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="qty">Rating</InputLabel>
                    <Select
                      labelId="qty"
                      // value={qty}
                      // onChange={(e) => setQty(e.target.value)}
                      id="qty"
                      label="Rating"
                    >
                      <MenuItem value="1">{"Poor"}</MenuItem>
                      <MenuItem value="2">{"Fair"}</MenuItem>
                      <MenuItem value="3">{"Good"}</MenuItem>
                      <MenuItem value="4">{"Better"}</MenuItem>
                      <MenuItem value="5">{"Excellent"}</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    placeholder="Enter Comment"
                    label="Comment"
                    variant="outlined"
                    color="primary"
                    type="text"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <Button variant="contained" color="primary" type="submit">
                    {"Submit Review"}
                  </Button>
                </Box>
              ) : (
                <Box display="flex" flexDirection="column">
                  <Typography style={{ marginBottom: 8 }}>
                    {"Please login to submit review"}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    component={Link}
                    to="/login"
                  >
                    {"Login"}
                  </Button>
                </Box>
              )}
            </ListItem>
            {product.reviews.length === 0 ? (
              <Alert severity="info">{"No reviews yet"}</Alert>
            ) : (
              product.reviews.map((review) => (
                <ListItem key={review._id}>
                  <Box display="flex" flexDirection="column">
                    <Typography variant="h6" style={{ color: "grey" }}>
                      {review.name}
                    </Typography>
                    <Typography>{`Rating: ${review.rating}/5`}</Typography>
                    <Typography paragraph>{review.comment}</Typography>
                  </Box>
                  <Divider variant="fullWidth" />
                </ListItem>
              ))
            )}
          </List>
        </Grid>
        <Grid item md={3}>
          <List>
            <ListItem>
              <Typography variant="h5">{product.name}</Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <Typography variant="h5">Price: ${product.price}</Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <Typography>Ratings: {product.rating}</Typography>
            </ListItem>
            <ListItem
              style={{
                fontSize: "1.1rem",
                textAlign: "justify",
              }}
            >
              {product.description}
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography variant="h5">Order</Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <Typography>
                Status:{" "}
                {product.countInStock === 0 ? "Out of stock" : "In Stock"}
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              {product.countInStock > 0 && (
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="qty">Qunatity</InputLabel>
                  <Select
                    labelId="qty"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    id="qty"
                    label="Qunatity"
                  >
                    {[...Array(product.countInStock).keys()].map((q) => (
                      <MenuItem value={q + 1} key={q + 1}>
                        {q + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </ListItem>
            <Divider />
            <ListItem>
              <Button
                variant="contained"
                color="primary"
                size="large"
                disabled={product.countInStock === 0}
                fullWidth
                onClick={addToCartHandler}
              >
                Add To Cart
              </Button>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductScreen;
