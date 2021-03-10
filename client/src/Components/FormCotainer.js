import React from "react";
import { Grid, Box } from "@material-ui/core";

const FormCotainer = ({ children }) => {
  return (
    <Grid container justify="center" component={Box} mt={10}>
      <Grid lg={4} md={5} item>
        {children}
      </Grid>
    </Grid>
  );
};

export default FormCotainer;
