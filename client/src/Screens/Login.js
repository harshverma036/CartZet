import React, { useState } from "react";
import FormContainer from "../Components/FormCotainer";
import { TextField, Button, Box, Typography } from "@material-ui/core";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <FormContainer>
      <Typography variant="h3">Sign In</Typography>
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
        >
          Login
        </Button>
      </Box>
    </FormContainer>
  );
};

export default Login;
