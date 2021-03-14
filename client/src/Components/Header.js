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
  Menu,
  MenuItem,
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

const Header = ({ changeMode }) => {
  const dispatch = useDispatch();

  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const isProfileMenuOpen = Boolean(profileMenuAnchorEl);

  const openProfileMenu = (e) => setProfileMenuAnchorEl(e.currentTarget);
  const closeProfileMenu = () => setProfileMenuAnchorEl(null);

  const [open, setOpen] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const profileMenu = (
    <Menu
      anchorEl={profileMenuAnchorEl}
      id="profile-menu"
      keepMounted
      open={isProfileMenuOpen}
    >
      <MenuItem component={Link} onClick={closeProfileMenu} to="/profile">
        My Profile
      </MenuItem>
      <MenuItem component={Link} onClick={closeProfileMenu} to="/logout">
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <>
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
                <Badge badgeContent={2} color="secondary">
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
              {!userInfo._id && (
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
              )}
              <Hidden mdDown>
                {userInfo._id && (
                  <Button
                    color="inherit"
                    size="large"
                    style={{ marginLeft: 4 }}
                    onClick={openProfileMenu}
                  >
                    <Person />
                    &nbsp; {userInfo.name.split(" ")[0]}
                  </Button>
                )}
              </Hidden>

              {userInfo._id && (
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
