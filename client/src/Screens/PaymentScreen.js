import React, { useEffect, useState } from "react";
import FormContainer from "../Components/FormCotainer";
import {
  Button,
  Box,
  Typography,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import Steps from "../Components/Steps";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod } from "../actions/cartActions";
import { Link } from "react-router-dom";

const ShppingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [payment, setPayment] = useState("PayPal");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!shippingAddress.address) {
        history.push("/shipping");
      }
    }
  }, [userInfo, history, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addPaymentMethod(payment));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <Steps step1 step2 step3 />
      <Typography variant="h4">Payment Method</Typography>
      <Box component="form" mt={1} onSubmit={submitHandler}>
        <FormControlLabel
          value={payment}
          control={<Radio checked />}
          label={"PayPal"}
          checked
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          style={{ marginTop: 10 }}
        >
          &nbsp;&nbsp; {"Place Order"}
        </Button>
      </Box>
    </FormContainer>
  );
};

export default ShppingScreen;
