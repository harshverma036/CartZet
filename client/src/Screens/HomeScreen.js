import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Grid,
  Box,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Data from "../data";

const HomeScreen = () => {
  return (
    <Box mt={2}>
      <Typography variant="h3" style={{ marginBottom: 14 }}>
        Products
      </Typography>
      <Grid container spacing={2}>
        {Data.map((product) => (
          <Grid md={3} item key={product._id}>
            <Card>
              <CardActionArea component={Link} to="/login">
                <CardMedia
                  component="img"
                  alt={product.name}
                  image={product.image}
                  title={product.name}
                />

                <CardContent>
                  <Typography>{product.name}</Typography>
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
