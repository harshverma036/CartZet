import React from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";

const AdminUsersScreeen = () => {
  return (
    <Grid container justify="center" style={{ marginTop: 16 }}>
      <Grid item xs={10}>
        <Typography variant="h3">{"Users"}</Typography>
      </Grid>
      <Grid item xs={10} style={{ marginTop: 10 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Admin</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">SAMPLE</TableCell>
                <TableCell align="center">6</TableCell>
                <TableCell align="center">89</TableCell>
                <TableCell align="center">
                  <ButtonGroup
                    size="small"
                    aria-label="small outlined button group"
                  >
                    <Button variant="contained" color="secondary">
                      <Edit />
                    </Button>
                    <Button variant="contained" color="primary">
                      <Delete />
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default AdminUsersScreeen;
