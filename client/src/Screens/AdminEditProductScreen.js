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
import { ImageRounded } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import Loader from "../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../actions/productActions";

const AdminProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  useEffect(() => {
    if (!product || productId !== product._id) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setDescription(product.description);
      setPrice(product.price);
      setCountInStock(product.countInStock);
    }
  }, [dispatch, productId, product]);

  const updateSubmitHandler = (e) => {
    e.preventDefault();
    // DISPATCH UPDATE PRODUCT
  };

  return (
    <Box mt={10}>
      <Grid container justify="center">
        <Grid item lg={4} md={5} xs={11}>
          <Typography variant="h3" color="primary">
            {"Edit Product"}
          </Typography>
          {loading ? (
            <Loader />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Box
              component="form"
              display="flex"
              flexDirection="column"
              onSubmit={updateSubmitHandler}
            >
              <TextField
                variant="outlined"
                color="primary"
                label="Product Name"
                placeholder="Product Name.."
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
                label="Brand"
                placeholder="Brand.."
                margin="normal"
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
                fullWidth
              />

              <TextField
                variant="outlined"
                color="primary"
                label="Category"
                placeholder="Category.."
                margin="normal"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                fullWidth
              />

              <TextField
                variant="outlined"
                color="primary"
                label="Price"
                placeholder="Price.."
                margin="normal"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                fullWidth
              />

              <TextField
                variant="outlined"
                color="primary"
                label="Count In Stock"
                placeholder="Count In Stock.."
                margin="normal"
                type="number"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                required
                fullWidth
              />

              <TextField
                variant="outlined"
                color="primary"
                label="Image"
                placeholder="Image.."
                margin="normal"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                disabled
                required
                fullWidth
              />

              <input
                accept="image/*"
                id="contained-button-file"
                style={{ display: "none" }}
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  component="span"
                >
                  <ImageRounded size={1} /> &nbsp; Upload
                </Button>
              </label>

              <TextField
                multiline
                variant="outlined"
                color="primary"
                label="Product Description"
                placeholder="Product Description.."
                margin="normal"
                type="text"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                fullWidth
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: 8 }}
                fullWidth
              >
                {"Save"}
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminProductEditScreen;
