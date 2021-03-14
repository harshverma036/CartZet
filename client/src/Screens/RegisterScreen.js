import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import FormContainer from "../Components/FormCotainer";
import { registerUser } from "../actions/userActions";

const RegisterScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchError, setMatchError] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, registeredUser, success, error } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMatchError("Password do not match!");
    } else {
      dispatch(registerUser({ name, email, password }));
    }
  };

  return (
    <FormContainer>
      <Typography variant="h3">Register</Typography>
      {error && (
        <Alert severity="error" style={{ marginTop: 12 }}>
          {error}
        </Alert>
      )}
      {matchError && (
        <Alert severity="error" style={{ marginTop: 12 }}>
          {matchError}
        </Alert>
      )}
      {success && (
        <Alert severity="success" style={{ marginTop: 12 }}>
          {"Successfully registered, Please login!"}
        </Alert>
      )}
      <Box component="form" mt={1} onSubmit={submitHandler}>
        <TextField
          placeholder="Enter name"
          label="Full Name"
          variant="outlined"
          color="primary"
          fullWidth
          type="text"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          placeholder="Enter email"
          label="Email"
          variant="outlined"
          color="primary"
          fullWidth
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          placeholder="Enter password"
          label="Password"
          variant="outlined"
          color="primary"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          placeholder="Confirm password"
          label="Confirm Password"
          variant="outlined"
          color="primary"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          style={{ marginTop: 10 }}
          disabled={loading}
        >
          {loading && <CircularProgress color="inherit" size={20} />}
          &nbsp;&nbsp; Register
        </Button>
      </Box>
    </FormContainer>
  );
};

export default RegisterScreen;
