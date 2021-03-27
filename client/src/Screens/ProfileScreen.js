import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";
// import {  } from '@material-ui/icons'
import Loader from "../Components/Loader";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserDetails,
  updateUserProfile,
  getUserOrdersList,
} from "../actions/userActions";
import { USER_PROFILE_UPDATE_RESET } from "../constants/userContstants";

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [fname, setFName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfileDetails = useSelector((state) => state.userProfileDetails);
  const { loading, userDetails, error } = userProfileDetails;

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = userProfileUpdate;

  const userOrdersList = useSelector((state) => state.userOrdersList);
  const {
    loading: ordersLoading,
    orders: allOrders,
    error: ordersError,
  } = userOrdersList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!userDetails.name || updateSuccess) {
        dispatch(getUserDetails());
        dispatch({ type: USER_PROFILE_UPDATE_RESET });
        setPassword("");
        setConfirmPassword("");
      } else {
        setFName(userDetails.name);
        setEmail(userDetails.email);
      }
      dispatch(getUserOrdersList());
    }
  }, [userInfo, history, userDetails, dispatch, updateSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Password do not match");
    } else {
      dispatch(updateUserProfile({ name: fname, email, password }));
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: 30 }}>
      <Grid container style={{ marginTop: 20 }} spacing={3}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Grid item md={4} xs={12}>
            {updateSuccess && (
              <Alert severity="success">{"Profile Update."}</Alert>
            )}
            {updateError && <Alert severity="error">{updateError}</Alert>}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
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
                disabled={updateLoading}
              >
                {updateLoading && (
                  <CircularProgress color="inherit" size={20} />
                )}
                &nbsp; &nbsp; Update Profile
              </Button>
            </Box>
          </Grid>
        )}
        <Grid item md={8} xs={12}>
          <Typography variant="h4">My Orders</Typography>

          {ordersLoading ? (
            <Loader />
          ) : ordersError ? (
            <Alert severity="error">{ordersError}</Alert>
          ) : (
            <TableContainer component={Box}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Order Date</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Delivered</TableCell>
                    <TableCell align="right">Details</TableCell>
                  </TableRow>
                </TableHead>
                {/* allOrders */}
                <TableBody>
                  {allOrders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{order.createdAt.split("T")[0]}</TableCell>
                      <TableCell>{order.isPaid ? "YES" : "NOT"}</TableCell>
                      <TableCell>{order.isDelivered ? "YES" : "NOT"}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          size="small"
                          color="inherit"
                          component={Link}
                          to={`/order/${order._id}`}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileScreen;
