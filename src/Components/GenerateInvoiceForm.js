import React, { useState, useRef } from "react";
import TabPanel from "./TabPanel";
import {
  Box,
  InputLabel,
  TextField,
  Typography,
  Grid,
  InputBase,
  Paper,
  MenuItem,
  Button,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { makeStyles } from "@mui/styles";
import AddTax from "./AddTax";
import TermsConditions from "./TermsConditions";
import Contact from "./Contact";
import BillDetails from "./BillDetails";
const useStyles = makeStyles((theme) => ({
  disableInput: {
    backgroundColor: "#edf2f9",
    padding: "3px",
    borderRadius: theme.shape.borderRadius,
  },
  billedByInputs: {
    border: "1px solid #dce4ec",
    padding: "3px",
    borderRadius: theme.shape.borderRadius,
  },
  countrycodeInput: {
    "& .MuiOutlinedInput-root": {
      "& #outlined-select-currency": {
        padding: "8px",
        border: "1px solid #dce4ec",
      },
    },
  },
  title: {
    fontSize: theme.typography.fonstSize,
    color: "#000",
  },
  addressField: {
    border: "1px solid #dce4ec",
  },
}));
function GenerateInvoiceForm() {
  const classes = useStyles();
  const [invoicedate, setinvoicedate] = useState(null);
  const [duedate, setduedate] = useState(null);
  const [notes, setNotes] = useState("");
  const [currency, setcurrency] = useState("USD");
  const [tab, setTab] = useState(0);
  const HourlyRateRef = useRef(null);
  const FlatRateRef = useRef(null);
  const continRateRef = useRef(null);
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };
  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "GBP",
      label: "฿",
    },
  ];

  const handleCurrencyChange = (e) => {
    setcurrency(e.target.value);
  };
  const handleSubmit = () => {
    console.log("submitted");
    console.log(tab);
    if (tab === 0) {
      // hourlyRateAccess();
      HourlyRateRef.current();
      // HourlyRateRef.current.validateHourlyRate();
    } else if (tab === 1) {
      FlatRateRef.current();
    } else {
      continRateRef.current();
    }
  };
  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Paper
        sx={{
          margin: { xs: "30px", sm: "48px" },
          padding: "0.75rem 1.25rem",
          position: "absolute",
          top: "-6.5rem",
          width: { xs: "73%", sm: "90%" },
        }}
      >
        <Typography
          sx={{
            textAlign: "left",
            fontWeight: "bold",
            ml: (theme) => theme.spacing(2),
          }}
        >
          Generate Invoice
        </Typography>
        <form>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Grid container>
                <Grid
                  item
                  xs={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <InputLabel className={classes.title}>Invoice No</InputLabel>
                  <Typography sx={{ color: "red" }}>*</Typography>
                </Grid>
                <Grid item xs={3}>
                  <InputBase
                    variant="outlined"
                    disabled
                    sx={{ width: { xs: "50px", sm: "80px" } }}
                    className={classes.disableInput}
                  />
                </Grid>
                <Grid item xs={3}>
                  <InputBase
                    variant="outlined"
                    disabled
                    sx={{ width: { xs: "50px", sm: "80px" } }}
                    className={classes.disableInput}
                  />
                </Grid>
                <Grid item xs={3}>
                  <InputBase
                    variant="outlined"
                    disabled
                    sx={{ width: { xs: "50px", sm: "80px" } }}
                    className={classes.disableInput}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid
                  item
                  xs={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: (theme) => theme.spacing(2),
                  }}
                >
                  <InputLabel className={classes.title}>
                    Invoice Date
                  </InputLabel>
                  <Typography sx={{ color: "red" }}>*</Typography>
                </Grid>
                <Grid item xs={9} sx={{ mt: (theme) => theme.spacing(2) }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Select Invoice Date"
                      value={invoicedate}
                      onChange={(newValue) => {
                        setinvoicedate(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: (theme) => theme.spacing(2),
                  }}
                >
                  <InputLabel className={classes.title}>Due Date</InputLabel>
                  <Typography sx={{ color: "red" }}>*</Typography>
                </Grid>
                <Grid item xs={9} sx={{ mt: (theme) => theme.spacing(2) }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Select Due Date"
                      value={duedate}
                      onChange={(newValue) => {
                        setduedate(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid
              container
              sx={{ mt: (theme) => theme.spacing(5) }}
              spacing={4}
            >
              <BillDetails />
            </Grid>
            <Paper
              sx={{
                width: { xs: "82%", sm: "100%" },
                mt: 5,
                p: 3,
                transition: "1s ease",
                "&:hover": {
                  boxShadow: " 0 25px 50px rgb(8 21 66 / 6%)",
                },
              }}
            >
              <Grid container sx={{ mt: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Choose Rate
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: "flex", mb: 1 }}>
                    <InputLabel className={classes.title}>
                      Choose Currency
                    </InputLabel>
                    <Typography sx={{ color: "red" }}>*</Typography>
                  </Box>
                  <TextField
                    fullWidth
                    id="outlined-select-currency"
                    select
                    className={classes.countrycodeInput}
                    value={currency}
                    onChange={handleCurrencyChange}
                    sx={{ textAlign: "left" }}
                  >
                    {currencies.map((option, index) => (
                      <MenuItem key={index} value={option.value}>
                        {option.value}({option.label})
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TabPanel
                  value={tab}
                  handleChange={handleTabChange}
                  HourlyRateRef={HourlyRateRef}
                  FlatRateRef={FlatRateRef}
                  continRateRef={continRateRef}
                />
              </Grid>
            </Paper>
            {/* <Grid item xs={12}>
              <TermsConditions />
            </Grid> */}
            <Grid item xs={12} sx={{ mt: 3 }}>
              <InputLabel sx={{ color: "black" }}>Notes</InputLabel>
              <InputBase
                multiline
                fullWidth
                minRows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={classes.billedByInputs}
              />
            </Grid>
            <Grid item xs={12}>
              <Contact />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
              <Button
                sx={{
                  cursor: "pointer",
                  textAlign: "center",
                  color: "#fff",
                  backgroundColor: "#4c66fb",
                  borderColor: "#4c66fb",
                  "&:hover": {
                    backgroundColor: "#2746fa",
                    color: "#fff",
                  },
                }}
                onClick={() => handleSubmit()}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default GenerateInvoiceForm;
