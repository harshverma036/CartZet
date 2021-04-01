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
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import { Edit } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../actions/userActions";

const AdminUsersScreeen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const listUsers = useSelector((state) => state.listUsers);
  const { loading, users, error } = listUsers;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }
    dispatch(getAllUsers());
  }, [userInfo, history, dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Alert severity="error">{error}</Alert>
  ) : (
    <Grid container justify="center" style={{ marginTop: 16 }}>
      <Grid item xs={10}>
        <Typography variant="h3">{"Users"}</Typography>
      </Grid>
      <Grid item xs={10} style={{ marginTop: 10 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Admin</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell align="center">{user._id}</TableCell>
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="center">
                    {user.isAdmin ? "YES" : "NO"}
                  </TableCell>
                  <TableCell align="center">
                    {user.createdAt.split("T")[0]}
                  </TableCell>
                  <TableCell align="center">
                    <ButtonGroup
                      size="small"
                      aria-label="small outlined button group"
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to={`/admin/users/edit/${user._id}`}
                      >
                        <Edit />
                      </Button>
                    </ButtonGroup>
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

export default AdminUsersScreeen;
