import React, { useEffect, useState } from "react";
import FormContainer from "../Components/FormCotainer";
import { TextField, Button, Box, Typography } from "@material-ui/core";
import Steps from "../Components/Steps";
import { useDispatch, useSelector } from "react-redux";
import { addShippingAddress } from "../actions/cartActions";

const ShppingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [country, setCountry] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      setAddress(shippingAddress.address);
      setCity(shippingAddress.city);
      setPin(shippingAddress.pin);
      setCountry(shippingAddress.country);
    }
  }, [userInfo, history, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addShippingAddress({ address, city, pin, country }));
    history.push("/payment");
  };

  return (
    <FormContainer>
      <Steps step1 step2 />
      <Typography variant="h4">Shipping Address</Typography>
      {/* {error && (
        <Alert style={{ marginTop: 12 }} severity="error">
          {error}
        </Alert>
      )} */}
      <Box component="form" mt={1} onSubmit={submitHandler}>
        <TextField
          placeholder="Enter Address"
          label="Address"
          variant="outlined"
          color="primary"
          fullWidth
          type="text"
          margin="normal"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <TextField
          placeholder="Enter City"
          label="City"
          variant="outlined"
          color="primary"
          fullWidth
          type="text"
          margin="normal"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <TextField
          placeholder="Enter pin"
          label="Pin Code"
          variant="outlined"
          color="primary"
          fullWidth
          type="text"
          margin="normal"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          required
        />
        <TextField
          placeholder="Enter Country"
          label="Country"
          variant="outlined"
          color="primary"
          fullWidth
          type="text"
          margin="normal"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          style={{ marginTop: 10 }}
        >
          {/* {loading && <CircularProgress color="inherit" size={20} />} */}
          &nbsp;&nbsp; {"Proceed to Payment"}
        </Button>
      </Box>
    </FormContainer>
  );
};

export default ShppingScreen;
