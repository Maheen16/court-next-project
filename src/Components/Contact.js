import { Paper, Typography, Grid, TextField } from "@mui/material";
import React from "react";

function Contact() {
  return (
    <Paper sx={{ mt: 3, pt: 3, pb: 3, pl: 2 }}>
      <Typography sx={{ fontWeight: 600 }}>Contact Details</Typography>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography variant="body1" sx={{ fontSize: "14px" }}>
            For any queries reach out via email at
          </Typography>
          <TextField
            error
            id="standard-basic"
            variant="standard"
            placeholder="E-mail Id"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography variant="body1" sx={{ fontSize: "14px" }}>
            or call on
          </Typography>
          <TextField
            error
            id="standard-basic"
            variant="standard"
            placeholder="phone number"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Contact;
