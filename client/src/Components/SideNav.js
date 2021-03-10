import React from "react";
import { Drawer, List, ListItem, Typography } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appDrawer: {
    minWidth: 220,
    fontSize: "1.1rem",
    fontWeight: "500",
  },
}));

const SideNav = ({ open, close }) => {
  const classes = useStyles();
  return (
    <Drawer open={open} onClose={close}>
      <List disablePadding className={classes.appDrawer}>
        <ListItem component={Typography} variant="h4">
          CartZet
        </ListItem>
        <ListItem button onClick={close} component={Link} to="/login">
          <Person />
          &nbsp;Sign In
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideNav;
