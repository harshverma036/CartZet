import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Loader from "../Components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../actions/userActions";

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [fname, setFName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfileDetails = useSelector((state) => state.userProfileDetails);
  const { loading, userDetails, error } = userProfileDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!userDetails.name) {
        dispatch(getUserDetails());
      } else {
        setFName(userDetails.name);
        setEmail(userDetails.email);
      }
    }
  }, [userInfo, history, userDetails, dispatch]);

  const submitHandler = () => console.log("Clicked");
  return (
    <Container maxWidth="lg" style={{ marginTop: 30 }}>
      <Grid container style={{ marginTop: 20 }} spacing={3}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Grid item md={4} xs={12}>
            <Typography variant="h4">Profile</Typography>
            <Box
              display="flex"
              flexDirection="column"
              component="form"
              onSubmit={submitHandler}
            >
              <TextField
                variant="outlined"
                color="primary"
                label="Name"
                placeholder="Name"
                value={fname}
                onChange={(e) => setFName(e.target.value)}
                margin="normal"
                type="text"
              />

              <TextField
                type="email"
                variant="outlined"
                color="primary"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                margin="normal"
              />

              <TextField
                type="password"
                variant="outlined"
                color="primary"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                margin="normal"
              />

              <TextField
                type="password"
                variant="outlined"
                color="primary"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                margin="normal"
              />

              <Button
                color="primary"
                variant="contained"
                fullWidth
                style={{ marginTop: 15 }}
                type="submit"
              >
                Update Profile
              </Button>
            </Box>
          </Grid>
        )}
        <Grid item md={8} xs={12}>
          <Typography variant="h4">My Orders</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileScreen;
