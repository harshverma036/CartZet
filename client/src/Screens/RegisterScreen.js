import React, { useState } from "react";
import FormContainer from "../Components/FormCotainer";
import { TextField, Button, Box, Typography } from "@material-ui/core";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <FormContainer>
      <Typography variant="h3">Register</Typography>
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
        >
          Register
        </Button>
      </Box>
    </FormContainer>
  );
};

export default RegisterScreen;
