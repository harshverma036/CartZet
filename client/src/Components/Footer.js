import React from "react";
import { Box, Typography } from "@material-ui/core";

const Footer = () => {
  const date = new Date();
  return (
    <Box p={3} textAlign="center">
      <Typography>Copyright &copy; CartZet {date.getFullYear()}</Typography>
    </Box>
  );
};

export default Footer;
