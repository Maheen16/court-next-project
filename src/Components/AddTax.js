import React, { useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableBody,
  TableRow,
  InputBase,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  billedByInputs: {
    width: "100%",
    border: "1px solid #dce4ec",
    padding: "3px",
    borderRadius: theme.shape.borderRadius,
  },
}));
function AddTax({
  subTotal,
  grandTotal,
  setGrandTotal,
  setFinalTax,
  finalTax,
}) {
  const classes = useStyles();
  const [noofTaxRow, setNoofTaxRow] = useState([
    {
      typeOfTax: "",
      percentTax: "",
      totalAmount: "",
    },
  ]);
  // const [totalTax, setTotalTax] = useState(0);  state uplifting
  const addTaxRow = () => {
    const temp = [...noofTaxRow];
    temp.push({
      typeOfTax: "",
      percentTax: "",
      totalAmount: "",
    });
    setNoofTaxRow(temp);
  };
  const deleteTaxRow = (index) => {
    const temp = [...noofTaxRow];
    temp.splice(index, 1);
    setNoofTaxRow(temp);
    let totaltaxvar = 0;
    temp.forEach((cur) => {
      totaltaxvar = totaltaxvar + cur.totalAmount;
    });
    // setTotalTax(totaltaxvar); now can use setFinalTax instead of setTotalTax
    setFinalTax(totaltaxvar);
    let grandtotalvar = 0;
    grandtotalvar = parseFloat(subTotal + totaltaxvar);
    setGrandTotal(grandtotalvar);
  };
  const handleChange = (e, index) => {
    const { name, value, type } = e.target;
    const temp = [...noofTaxRow];
    temp[index][name] = value;
    setNoofTaxRow(temp);
    if (value > 0) {
      //.....calculating tax in percent.....

      temp[index]["totalAmount"] = subTotal * (temp[index]["percentTax"] / 100);
      setNoofTaxRow(temp);

      //.....setting value of total tax for hourly rate.....

      let totaltaxvar = 0;
      noofTaxRow.forEach((cur) => {
        totaltaxvar = totaltaxvar + cur.totalAmount;
      });
      setFinalTax(totaltaxvar);

      //.....setting value of total tax for flat rate.....

      let flatTotalTaxVar = 0;
      noofTaxRow.forEach((cur) => {
        flatTotalTaxVar = flatTotalTaxVar + cur.totalAmount;
      });
      setFinalTax(flatTotalTaxVar);
      console.log(flatTotalTaxVar);

      //.....setting value of total tax for Contingency rate.....

      let continTotalTaxVar = 0;
      noofTaxRow.forEach((cur) => {
        continTotalTaxVar = continTotalTaxVar + cur.totalAmount;
      });
      setFinalTax(continTotalTaxVar);

      // console.log(continTotalTaxVar);

      //.....setting value of grand total for hourly rate.....

      let grandtotalvar = 0;
      grandtotalvar = parseFloat(subTotal + totaltaxvar);
      setGrandTotal(grandtotalvar);
      // console.log(subTotal, totaltaxvar, grandtotalvar);

      //.....setting value of grandtotal for flat rate.....

      let fgt = 0;
      fgt = subTotal + flatTotalTaxVar;
      setGrandTotal(fgt);
      console.log(fgt);
    } else if (value !== "" && type == "number") {
      const temp = [...noofTaxRow];
      temp[index][name] = "";
      setNoofTaxRow(temp);
      alert("invalid tax");
    }
  };
  return (
    <div>
      <Paper sx={{ width: "100px", mt: 3, textAlign: "center" }}>
        <Button
          sx={{ color: "black", textTransform: "capitalize", fontWeight: 500 }}
          onClick={addTaxRow}
        >
          Add Tax
        </Button>
      </Paper>
      <TableContainer>
        <Table sx={{ mt: 3 }}>
          <TableBody>
            {noofTaxRow.map((taxRow, index) => {
              return (
                <TableRow key={index}>
                  <TableCell sx={{ border: "1px solid #edf2f9" }}>
                    <InputBase
                      variant="outlined"
                      fullWidth
                      name="typeOfTax"
                      value={taxRow.typeOfTax}
                      placeholder="Description"
                      onChange={(e) => handleChange(e, index)}
                      className={classes.billedByInputs}
                    />
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #edf2f9" }}>
                    <InputBase
                      variant="outlined"
                      fullWidth
                      type="number"
                      value={taxRow.percentTax}
                      name="percentTax"
                      placeholder="Tax"
                      onChange={(e) => handleChange(e, index)}
                      className={classes.billedByInputs}
                      // InputProps={{
                      startAdornment={
                        <InputAdornment position="start">%</InputAdornment>
                      }
                      // }}
                    />
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #edf2f9" }}>
                    <InputBase
                      variant="outlined"
                      fullWidth
                      type="number"
                      name="totalAmount"
                      disabled
                      value={taxRow.totalAmount}
                      placeholder="Total"
                      className={classes.billedByInputs}
                    />
                  </TableCell>
                  <TableCell>
                    <IndeterminateCheckBoxOutlinedIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => deleteTaxRow(index)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableBody>
            <TableRow>
              {/* <TableCell rowSpan={3} /> */}
              <TableCell sx={{ fontWeight: "bold" }}>Sub Total</TableCell>
              <TableCell colSpan={3}>
                <InputBase
                  variant="outlined"
                  fullWidth
                  type="number"
                  placeholder="0.00"
                  disabled
                  value={subTotal}
                  sx={{ backgroundColor: "#edf2f9" }}
                  className={classes.billedByInputs}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Total Tax</TableCell>
              <TableCell colSpan={3}>
                <InputBase
                  variant="outlined"
                  fullWidth
                  type="number"
                  placeholder="0.00"
                  disabled
                  value={finalTax}
                  sx={{ backgroundColor: "#edf2f9" }}
                  className={classes.billedByInputs}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Grand Total</TableCell>
              <TableCell colSpan={3}>
                <InputBase
                  variant="outlined"
                  fullWidth
                  type="number"
                  disabled
                  value={grandTotal}
                  sx={{ backgroundColor: "#edf2f9" }}
                  className={classes.billedByInputs}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default AddTax;
