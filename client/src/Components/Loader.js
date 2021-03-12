import React from "react";
import { Box, CircularProgress } from "@material-ui/core";

const Loader = () => {
  return (
    <Box display="flex" justifyContent="center">
      <CircularProgress size={170} thickness={1} />
    </Box>
  );
};

export default Loader;
