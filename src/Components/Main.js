import { Grid } from "@mui/material";
import React from "react";
import LeftBar from "./Drawer";
import GenerateInvoice from "./GenerateInvoice";
import GenerateInvoiceForm from "./GenerateInvoiceForm";
import Navbar from "./Navbar";

export default function Main() {
  return (
    <div>
      <Grid container>
        <Grid item xs={2}>
          <LeftBar />
        </Grid>
        <Grid item xs={12} sm={10}>
          {/* <Navbar /> */}
          <GenerateInvoice />
          <GenerateInvoiceForm />
        </Grid>
      </Grid>
    </div>
  );
}
