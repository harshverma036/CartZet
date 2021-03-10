import React from "react";
import { Grid, Box } from "@material-ui/core";

const FormCotainer = ({ children }) => {
  return (
    <Grid container justify="center" component={Box} mt={4}>
      <Grid lg={5} item>
        {children}
      </Grid>
    </Grid>
  );
};

export default FormCotainer;
