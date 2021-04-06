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
  CircularProgress,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Delete, Edit, Add } from "@material-ui/icons";
import Loader from "../Components/Loader";
import { Alert } from "@material-ui/lab";
import { getProductsList, createProduct } from "../actions/productActions";
import { CREATE_PRODUCT_RESET } from "../constants/productConstants";

const AdminProductsScreeen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productsList = useSelector((state) => state.productsList);
  const { loading, products, error } = productsList;

  const createNewProduct = useSelector((state) => state.createNewProduct);
  const {
    loading: createProductLoading,
    success,
    newProduct,
    error: createProductError,
  } = createNewProduct;

  useEffect(() => {
    dispatch({ type: CREATE_PRODUCT_RESET });
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else {
      dispatch(getProductsList());
    }
    if (success) {
      history.push(`/admin/products/${newProduct._id}`);
    }
  }, [userInfo, history, success]);

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <Grid container justify="center" style={{ marginTop: 16 }}>
      <Grid item xs={12} component={Box} display="flex" flexDirection="row">
        {createProductError && (
          <Alert severity="error">{createProductError}</Alert>
        )}
        <Typography variant="h3">{"Products"}</Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "auto" }}
          onClick={createProductHandler}
        >
          {createProductLoading ? (
            <>
              <CircularProgress size={25} color="inherit" />
              &nbsp;{"Creating..."}
            </>
          ) : (
            <>
              <Add />
              &nbsp;Add Product
            </>
          )}
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
