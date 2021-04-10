import React from "react";
import { TextField, Box, IconButton, Button } from "@material-ui/core";
import { Search } from "@material-ui/icons";

const SearchBar = () => {
  return (
    <Box component="form" display="flex" mb={1} flexDirection="row">
      <TextField
        placeholder="Search..."
        label="Search"
        variant="outlined"
        style={{ color: "white", borderColor: "#fff" }}
        type="text"
        margin="dense"
        required
        fullWidth
      />
      <IconButton color="inherit" color="primary">
        <Search />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
