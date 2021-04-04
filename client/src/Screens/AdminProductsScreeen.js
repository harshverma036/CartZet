import React, { useEffect } from "react";
import {
  Box,
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
import { useDispatch, useSelector } from "react-redux";
import { Delete, Edit, Add } from "@material-ui/icons";
import Loader from "../Components/Loader";
import { Alert } from "@material-ui/lab";
import { getProductsList } from "../actions/productActions";

const AdminProductsScreeen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productsList = useSelector((state) => state.productsList);
  const { loading, products, error } = productsList;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else {
      dispatch(getProductsList());
    }
  }, [userInfo, history]);
  return (
    <Grid container justify="center" style={{ marginTop: 16 }}>
      <Grid item xs={12} component={Box} display="flex" flexDirection="row">
        <Typography variant="h3">{"Products"}</Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "auto" }}
        >
          <Add />
          &nbsp;Add Product
        </Button>
      </Grid>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid item xs={12} style={{ marginTop: 10 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">In Stock</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell align="center">{product._id}</TableCell>
                    <TableCell align="center">{product.name}</TableCell>
                    <TableCell align="center">
                      {product.countInStock > 0
                        ? product.countInStock
                        : "OUT OF STOCK"}
                    </TableCell>
                    <TableCell align="center">{product.price}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup
                        size="small"
                        aria-label="small outlined button group"
                      >
                        <Button variant="contained" color="secondary">
                          <Edit />
                        </Button>
                        <Button variant="contained" color="primary">
                          <Delete />
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </Grid>
  );
};

export default AdminProductsScreeen;
