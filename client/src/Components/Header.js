import React, { useState } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Button,
  Box,
  Typography,
  Hidden,
  Badge,
} from "@material-ui/core";
import SideNav from "./SideNav";
import { Link } from "react-router-dom";
import { Menu, Person, ShoppingCart, Brightness3 } from "@material-ui/icons";

const Header = ({ changeMode }) => {
  const [open, setOpen] = useState(false);
  return (
    <AppBar color="primary" position="relative">
      <Container maxWidth="lg">
        <Toolbar>
          <Hidden lgUp>
            <IconButton
              edge="start"
              aria-label="menu"
              color="inherit"
              style={{ marginRight: 6 }}
              onClick={() => setOpen(!open)}
            >
              <Menu />
            </IconButton>
            <SideNav open={open} close={() => setOpen(!open)} />
          </Hidden>

          <Typography variant="h5">{"CartZet"}</Typography>

          <Box ml="auto">
            <IconButton color="inherit" aria-label="cart">
              <Badge badgeContent={2} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton color="inherit" arial-label="mode" onClick={changeMode}>
              <Brightness3 />
            </IconButton>
            <Hidden mdDown>
              <Button
                color="inherit"
                size="large"
                style={{ marginLeft: 4 }}
                component={Link}
                to="/login"
              >
                <Person />
                &nbsp; Sign In
              </Button>
            </Hidden>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
