import React, { useState } from "react";
import { TextField, Box, IconButton, Button } from "@material-ui/core";
import { Search } from "@material-ui/icons";

const SearchBar = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submitHandler}
      display="flex"
      mb={1}
      flexDirection="row"
    >
      <TextField
        placeholder="Search..."
        label="Search"
        variant="outlined"
        style={{ color: "white", borderColor: "#fff" }}
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        margin="dense"
        required
        fullWidth
      />
      <IconButton color="inherit" color="primary" type="submit">
        <Search />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
