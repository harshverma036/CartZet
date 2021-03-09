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
import { Menu, Person, ShoppingCart } from "@material-ui/icons";

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <AppBar color="primary">
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

            <Hidden mdDown>
              <Button color="inherit" size="large" style={{ marginLeft: 4 }}>
                {" "}
                <Person />
                &nbsp; Sign In{" "}
              </Button>
            </Hidden>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
