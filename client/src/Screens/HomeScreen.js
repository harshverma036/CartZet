import React, { useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Grid,
  Box,
  Typography,
} from "@material-ui/core";
import Loader from "../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Ratings from "../Components/Ratings";
import { getProductsList } from "../actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productsList = useSelector((state) => state.productsList);
  const { loading, products, error } = productsList;

  useEffect(() => {
    dispatch(getProductsList());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <p>{error}</p>
  ) : (
    <Box mt={2}>
      <Typography variant="h3" style={{ marginBottom: 14 }}>
        Products
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid md={3} sm={6} item key={product._id}>
            <Card style={{ height: "100%" }}>
              <CardActionArea
                component={Link}
                to={`/product/${product._id}`}
                style={{ height: "100%" }}
              >
                <CardMedia
                  component="img"
                  alt={product.name}
                  image={product.image}
                  title={product.name}
                />
                <CardContent>
                  <Typography>{product.name}</Typography>
                  <Ratings value={product.rating} />
                  <Typography variant="h5">${product.price}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomeScreen;
