import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../actions/userActions";

const AdminUserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfileDetails = useSelector((state) => state.userProfileDetails);
  const { userDetails } = userProfileDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getUserDetails());
      setName(userDetails.name);
      setEmail(userDetails.email);
      setIsAdmin(userInfo.isAdmin);
    }
  }, [userInfo, history, dispatch]);

  return (
    <Box mt={10}>
      <Grid container justify="center">
        <Grid item lg={4} md={5} xs={11}>
          <Typography variant="h3" color="primary">
            {"Edit User"}
          </Typography>
          <Box component="form" display="flex" flexDirection="column">
            <TextField
              variant="outlined"
              color="primary"
              label="Name"
              placeholder="Name.."
              margin="normal"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />

            <TextField
              variant="outlined"
              color="primary"
              label="Email"
              placeholder="Email.."
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  color="primary"
                  name="admin"
                />
              }
              label="Make As Admin"
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 8 }}
              fullWidth
            >
              {"Save"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminUserEditScreen;
