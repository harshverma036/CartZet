import React, { useState } from "react";
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
import { Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";

const CartScreen = () => {
  const [qty, setQty] = useState(1);
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
            <ListItem button>
              <ListItemAvatar>
                <Avatar>CI</Avatar>
              </ListItemAvatar>
              <ListItemText primary="ITEM NAME" secondary="ITEM BRAND, CAT" />
              <ListItemSecondaryAction>
                <FormControl variant="outlined" style={{ marginRight: 18 }}>
                  <InputLabel id="qty">Qunatity</InputLabel>
                  <Select
                    labelId="qty"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    id="qty"
                    label="Qunatity"
                  >
                    <MenuItem value={1}>1</MenuItem>
                  </Select>
                </FormControl>
                <IconButton edge="end">
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
        <Grid item lg={3} md={4} xs={12}>
          <List>
            <ListItem component={Typography} variant="h5">
              Cart Items
            </ListItem>
            <Divider />
            <ListItem component={Typography} variant="h6">
              Total Items: {"0"}
            </ListItem>
            <ListItem component={Typography} variant="h6">
              Total Price: {"0.00"}
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                size="large"
                color="primary"
                variant="contained"
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
