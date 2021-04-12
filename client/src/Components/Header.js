import React, { Fragment, useState } from "react";
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
  Menu,
  MenuItem,
  Divider,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import SideNav from "./SideNav";
import { Link } from "react-router-dom";
import {
  Menu as MenuIcon,
  Person,
  ShoppingCart,
  Brightness3,
  MoreVert,
} from "@material-ui/icons";
import { logoutUser } from "../actions/userActions";

const Header = ({ changeMode }) => {
  const dispatch = useDispatch();

  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const isProfileMenuOpen = Boolean(profileMenuAnchorEl);

  const openProfileMenu = (e) => setProfileMenuAnchorEl(e.currentTarget);
  const closeProfileMenu = () => setProfileMenuAnchorEl(null);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logoutUser());
    closeProfileMenu();
  };

  const [open, setOpen] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const profileMenu = (
    <Menu
      anchorEl={profileMenuAnchorEl}
      id="profile-menu"
      keepMounted
      open={isProfileMenuOpen}
      onClose={closeProfileMenu}
    >
      <MenuItem component={Link} onClick={closeProfileMenu} to="/profile">
        My Profile
      </MenuItem>
      <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      {userInfo && userInfo.isAdmin && (
        <div>
          <Divider />
          <MenuItem disabled>{"Admin Only"}</MenuItem>
          <MenuItem
            component={Link}
            to="/admin/products"
            onClick={closeProfileMenu}
          >
            {"Products"}
          </MenuItem>
          <MenuItem
            component={Link}
            to="/admin/users"
            onClick={closeProfileMenu}
          >
            {"Users"}
          </MenuItem>
          <MenuItem
            component={Link}
            to="/admin/orders"
            onClick={closeProfileMenu}
          >
            {"Orders"}
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <>
      <AppBar color="primary" position="relative">
        <Container maxWidth="lg">
          <Toolbar>
            <Hidden xsUp>
              <IconButton
                edge="start"
                aria-label="menu"
                color="inherit"
                style={{ marginRight: 6 }}
                onClick={() => setOpen(!open)}
              >
                <MenuIcon />
              </IconButton>
              <SideNav open={open} close={() => setOpen(!open)} />
            </Hidden>

            <Typography
              variant="h5"
              component={Link}
              to="/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {"CartZet"}
            </Typography>

            <Box ml="auto">
              <IconButton
                color="inherit"
                aria-label="cart"
                component={Link}
                to="/cart"
              >
                <Badge
                  badgeContent={cartItems.length > 0 ? cartItems.length : "0"}
                  color="secondary"
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <IconButton
                color="inherit"
                arial-label="mode"
                onClick={changeMode}
              >
                <Brightness3 />
              </IconButton>
              {!userInfo && (
                <>
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
                  <Hidden lgUp>
                    <IconButton color="inherit" component={Link} to="/login">
                      <Person />
                    </IconButton>
                  </Hidden>
                </>
              )}
              {userInfo && (
                <Hidden mdDown>
                  <Button
                    color="inherit"
                    size="large"
                    style={{ marginLeft: 4 }}
                    onClick={openProfileMenu}
                  >
                    <Person />
                    &nbsp; {userInfo.name.split(" ")[0]}
                  </Button>
                </Hidden>
              )}

              {userInfo && (
                <Hidden lgUp>
                  <IconButton color="inherit" onClick={openProfileMenu}>
                    <MoreVert />
                  </IconButton>
                </Hidden>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {profileMenu}
    </>
  );
};

export default Header;
