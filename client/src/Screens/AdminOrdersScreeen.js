import React, { useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Loader from "../Components/Loader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersList } from "../actions/orderActions";

const AdminOrdersScreeen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const ordersList = useSelector((state) => state.ordersList);
  const { loading, orders, error } = ordersList;

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push("/login");
    }
    dispatch(getOrdersList());
  }, [userInfo, history, dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Alert severity="error">{error}</Alert>
  ) : (
    <Grid container justify="center" style={{ marginTop: 16 }}>
      <Grid item xs={10}>
        <Typography variant="h3">{"Orders"}</Typography>
      </Grid>
      <Grid item xs={10} style={{ marginTop: 10 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Paid</TableCell>
                <TableCell align="center">Delivered</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell align="center">{order._id}</TableCell>
                  <TableCell align="center">
                    <a
                      href={`mailto:${order.user.email}`}
                      style={{ color: "inherit" }}
                    >
                      {order.user.email}
                    </a>
                  </TableCell>
                  <TableCell align="center">
                    {order.createdAt.split("T")[0]}
                  </TableCell>
                  <TableCell align="center">
                    {order.isPaid ? "YES" : "NO"}
                  </TableCell>
                  <TableCell align="center">
                    {order.isDelivered ? "YES" : "NO"}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      component={Link}
                      to={`/order/${order._id}`}
                    >
                      {"Details"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default AdminOrdersScreeen;
