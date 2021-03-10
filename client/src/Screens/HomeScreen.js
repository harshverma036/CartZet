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

const HomeScreen = () => {
  return (
    <Box mt={2}>
      <Typography variant="h3">Products</Typography>
      <Grid container spacing={2}>
        <Grid md={3} item>
          <Card>
            <CardActionArea component={Link} to="/login">
              <CardMedia
                component="img"
                alt="image_name"
                image="/images/airpods.jpg"
                title="image_name"
              />

              <CardContent>
                <Typography>{"PRODUCT NAME"}</Typography>
                <Typography variant="h5">${"0.00"}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeScreen;
