import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  InputBase,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  billedByInputs: {
    border: "1px solid #dce4ec",
    padding: "3px",
    borderRadius: theme.shape.borderRadius,
  },
  title: {
    fontSize: theme.typography.fonstSize,
    color: "#000",
  },
  countrycodeInput: {
    "& .MuiOutlinedInput-root": {
      "& #outlined-select-currency": {
        padding: "8px",
        border: "1px solid #dce4ec",
      },
    },
  },
}));
function BillDetails() {
  const classes = useStyles();
  const [countryCode, setcountryCode] = useState("India");
  const [customerName, setcustomerName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const countrycodes = [
    {
      value: "India",
      label: "+91",
    },
    {
      value: "Nigeria",
      label: "+92",
    },
    {
      value: "Chad",
      label: "+93",
    },
    {
      value: "Central African Republic",
      label: "+94",
    },
  ];
  const handleChange = (event) => {
    setcountryCode(event.target.value);
    // setcountryCode({ [event.target.name]: event.target.value });
    console.log(countryCode);
  };
  return (
    <>
      <Grid item xs={12} sm={6}>
        <Paper
          sx={{
            padding: "1.4rem",
            transition: "2s ease",
            "&:hover": {
              boxShadow: " 0 25px 50px rgb(8 21 66 / 6%)",
            },
          }}
          elevation={2}
        >
          <Typography
            sx={{
              textAlign: "left",
              fontWeight: "bold",
              fontSize: "17px",
              mb: 2,
            }}
          >
            Billed By
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", mb: 1 }}>
                <InputLabel className={classes.title}>Name</InputLabel>
                <Typography sx={{ color: "red" }}>*</Typography>
              </Box>
              <InputBase
                variant="outlined"
                fullWidth
                className={classes.billedByInputs}
                onChange={(e) => setcustomerName(e.target.value)}
                value={customerName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", mb: 1 }}>
                <InputLabel className={classes.title}>Email</InputLabel>
                <Typography sx={{ color: "red" }}>*</Typography>
              </Box>
              <InputBase
                variant="outlined"
                fullWidth
                value={email}
                className={classes.billedByInputs}
                onChange={(e) => setemail(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <Box sx={{ display: "flex", mb: 1 }}>
                <InputLabel className={classes.title}>Country Code</InputLabel>
                <Typography sx={{ color: "red" }}>*</Typography>
              </Box>
              <TextField
                fullWidth
                id="outlined-select-currency"
                select
                className={classes.countrycodeInput}
                value={countryCode}
                onChange={handleChange}
                sx={{ textAlign: "left" }}
              >
                {countrycodes.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: "flex", mb: 1 }}>
                <InputLabel className={classes.title}>Phone No</InputLabel>
                <Typography sx={{ color: "red" }}>*</Typography>
              </Box>
              <InputBase
                type="number"
                fullWidth
                className={classes.billedByInputs}
                name="phone number"
                value={phoneNumber}
                onChange={(e) => setphoneNumber(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", mb: 1 }}>
                <InputLabel className={classes.title}>Address</InputLabel>
                <Typography sx={{ color: "red" }}>*</Typography>
              </Box>
              <TextField
                fullWidth
                id="outlined-multiline-flexible"
                multiline
                rows={4}
                className={classes.addressField}
                onChange={(e) => setaddress(e.target.value)}
                value={address}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper
          sx={{
            padding: "1.4rem",
            transition: "2s ease",
            "&:hover": {
              boxShadow: " 0 25px 50px rgb(8 21 66 / 6%)",
            },
          }}
          elevation={2}
        >
          <Typography
            sx={{
              textAlign: "left",
              fontWeight: "bold",
              fontSize: "17px",
              mb: 2,
            }}
          >
            Billed To
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", mb: 1 }}>
                <InputLabel className={classes.title}>Name</InputLabel>
                <Typography sx={{ color: "red" }}>*</Typography>
              </Box>
              <InputBase
                variant="outlined"
                fullWidth
                className={classes.billedByInputs}
                onChange={(e) => setcustomerName(e.target.value)}
                value={customerName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", mb: 1 }}>
                <InputLabel className={classes.title}>Email</InputLabel>
                <Typography sx={{ color: "red" }}>*</Typography>
              </Box>
              <InputBase
                variant="outlined"
                fullWidth
                value={email}
                className={classes.billedByInputs}
                onChange={(e) => setemail(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <Box sx={{ display: "flex", mb: 1 }}>
                <InputLabel className={classes.title}>Country Code</InputLabel>
                <Typography sx={{ color: "red" }}>*</Typography>
              </Box>
              <TextField
                fullWidth
                id="outlined-select-currency"
                select
                className={classes.countrycodeInput}
                value={countryCode}
                onChange={handleChange}
                sx={{ textAlign: "left" }}
              >
                {countrycodes.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: "flex", mb: 1 }}>
                <InputLabel className={classes.title}>Phone No</InputLabel>
                <Typography sx={{ color: "red" }}>*</Typography>
              </Box>
              <InputBase
                type="number"
                fullWidth
                className={classes.billedByInputs}
                name="phone number"
                value={phoneNumber}
                onChange={(e) => setphoneNumber(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", mb: 1 }}>
                <InputLabel className={classes.title}>Address</InputLabel>
                <Typography sx={{ color: "red" }}>*</Typography>
              </Box>
              <TextField
                fullWidth
                id="outlined-multiline-flexible"
                multiline
                rows={4}
                className={classes.addressField}
                onChange={(e) => setaddress(e.target.value)}
                value={address}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default BillDetails;
