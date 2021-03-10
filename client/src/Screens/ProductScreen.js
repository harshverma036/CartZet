import React, { useState } from "react";
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
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import data from "../data";
import { Link } from "react-router-dom";

const ProductScreen = ({ match }) => {
  const [qty, setQty] = useState(1);
  const productId = match.params.id;

  const product = data.find((p) => p._id == productId);

  const addToCartHandler = () => {
    console.log("Clicked");
  };

  return (
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
                color: grey[600],
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
