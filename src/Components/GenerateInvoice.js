import React from "react";
import InsertDriveFileSharpIcon from "@mui/icons-material/InsertDriveFileSharp";
import { Grid, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  document: {
    backgroundColor: "rgba(255, 255, 255, .15)",
    color: "#fff",
    padding: "11px",
    borderRadius: "3px",
    marginRight: "5px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(128, 128, 128, .15)",
    },
  },
}));
function GenerateInvoice() {
  const classes = useStyles();
  return (
    <Grid
      container
      sx={{
        background: "#12263F",
        color: "white",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          pb: 8,
          pt: 14,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          pl: { xs: 0, sm: 8 },
          ml: { xs: 4, sm: 0 },
          // pl: 8,
          mb: { xs: 2, sm: 0 },
        }}
      >
        <InsertDriveFileSharpIcon className={classes.document} />
        <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
          Generate New Invoice
        </Typography>
      </Grid>
    </Grid>
  );
}

export default GenerateInvoice;
