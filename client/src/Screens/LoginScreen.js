import React, { useEffect, useState } from "react";
import FormContainer from "../Components/FormCotainer";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { teal } from "@material-ui/core/colors";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userActions";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.name) {
      history.push("/");
    } else {
      history.push("/login");
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <FormContainer>
      <Typography variant="h3">Sign In</Typography>
      {error && (
        <Alert style={{ marginTop: 12 }} severity="error">
          {error}
        </Alert>
      )}
      <Box component="form" mt={1} onSubmit={submitHandler}>
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
          &nbsp;&nbsp; Login
        </Button>
        <Typography style={{ marginTop: 8 }}>
          Don't Have Account?{" "}
          <Link to="/register" style={{ color: teal[500] }}>
            Register
          </Link>{" "}
        </Typography>
      </Box>
    </FormContainer>
  );
};

export default Login;
