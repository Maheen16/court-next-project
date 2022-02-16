import React, { useState } from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  TextField,
  Button,
  Paper,
  Grid,
} from "@mui/material";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import { makeStyles } from "@mui/styles";
import AddTax from "../Components/AddTax";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  billedByInputs: {
    border: "1px solid #dce4ec",
    padding: "6px",
    borderRadius: theme.shape.borderRadius,
  },
}));
function ContingencyRate({ continRateRef }) {
  const row = ["description", "win amount", "rate", "total", " "];
  const classes = useStyles();
  const [dynamicRows, setDynamicRows] = useState([
    {
      Description: "",
      winAmount: "",
      rate: "",
      total: "",
    },
  ]);
  const [contingencySubTotal, setContingencySubTotal] = useState(0);
  const [finalTax, setFinalTax] = useState(0);
  const [continGrandTotal, setContinGrandTotal] = useState(0);
  const [error, updateError] = useState([]);

  const addRow = () => {
    let temp = [...dynamicRows];
    let errorArr = [];
    let isValid = true;
    dynamicRows.forEach((curRow, index) => {
      if (
        curRow.Description === "" ||
        curRow.rate === "" ||
        curRow.winAmount === ""
      ) {
        isValid = false;
      }
      if (!dynamicRows[index]["Description"].trim()) {
        errorArr.push(`Description_${index}`);
      }
      if (!dynamicRows[index]["winAmount"].trim()) {
        errorArr.push(`winAmount_${index}`);
      }
      if (!dynamicRows[index]["rate"].trim()) {
        errorArr.push(`rate_${index}`);
      }
      // if (errorArr.length > 0) {
      // } else {
      //   updateError([]);
      // }
      updateError(errorArr);
    });

    if (isValid) {
      temp.push({
        Description: "",
        winAmount: "",
        rate: "",
        total: "",
      });
      setDynamicRows(temp);
    }
  };
  const deleteRow = (index) => {
    const temp = [...dynamicRows];
    temp.splice(index, 1);
    setDynamicRows(temp);

    // .....updating subtotal on delete row.....

    let subtotal = 0;
    temp.forEach((arr, index) => {
      subtotal = subtotal + arr.total;
    });
    setContingencySubTotal(subtotal);

    // .....updating grand total on delete row.....

    let grandtotalvar = 0;
    grandtotalvar = parseFloat(subtotal + finalTax);
    setContinGrandTotal(grandtotalvar);
  };
  const handleChange = (e, index) => {
    const temp = [...dynamicRows];
    const { name, value, type } = e.target;
    temp[index][name] = value;
    setDynamicRows(temp);

    //.....updating value of total .....

    if (value > 0) {
      temp[index]["total"] =
        parseFloat(temp[index]["winAmount"] * temp[index]["rate"]) / 100;
      setDynamicRows(temp);
      let contingencySubTotal = 0;
      dynamicRows.forEach((cur) => {
        contingencySubTotal = contingencySubTotal + cur.total;
      });
      setContingencySubTotal(contingencySubTotal);

      //.....updating value of grand total .....
      let cgt = 0;
      cgt = finalTax + contingencySubTotal;
      setContinGrandTotal(cgt);
    } else if (value !== "" && type == "number") {
      let temp = [...dynamicRows];
      temp[index][name] = "";
      setDynamicRows(temp);
      alert("invalid value");
    }
  };
  const validateContinRate = () => {
    let errorArr = [];
    dynamicRows.forEach((obj, i) => {
      if (!dynamicRows[i]["Description"].trim()) {
        errorArr.push(`Description_${i}`);
      }
      if (!dynamicRows[i]["rate"].trim()) {
        errorArr.push(`rate_${i}`);
      }
      if (!dynamicRows[i]["winAmount"].trim()) {
        errorArr.push(`winAmount_${i}`);
      }
      updateError(errorArr);
    });
  };
  const handleBlur = (e, ele) => {
    console.log("blurred");
    let errorArray = [...error];
    let index = errorArray.indexOf(ele);
    if (e.target.value === "") {
      if (!errorArray.includes(ele)) {
        errorArray.push(ele);
      }
    } else {
      if (index !== -1) {
        errorArray.splice(index, 1);
      }
    }
    updateError(errorArray);
  };
  useEffect(() => {
    continRateRef.current = validateContinRate;
  }, [continRateRef.current]);
  return (
    <div>
      <Typography sx={{ fontWeight: "bold" }}>
        Contingency Fee(No win/No Fee):
      </Typography>
      <TableContainer>
        <Table sx={{ mt: 3 }}>
          <TableHead>
            <TableRow>
              {row.map((title, index) => {
                return (
                  <TableCell
                    key={index}
                    sx={{
                      textTransform: "uppercase",
                      border: "1px solid #edf2f9",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {title}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {dynamicRows?.map((row, index) => {
              return (
                <TableRow key={index}>
                  <TableCell sx={{ border: "1px solid #edf2f9" }}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="Description"
                      value={row.Description}
                      onChange={(e) => handleChange(e, index)}
                      placeholder="Description"
                      onBlur={(e) => handleBlur(e, `Description_${index}`)}
                      InputProps={{
                        classes: { input: classes.billedByInputs },
                      }}
                      helperText={
                        error.includes(`Description_${index}`) ? "Required" : ""
                      }
                      error={error.includes(`Description_${index}`)}
                    />
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #edf2f9" }}>
                    <TextField
                      type="number"
                      variant="outlined"
                      fullWidth
                      placeholder="Win Amount"
                      name="winAmount"
                      value={row.winAmount}
                      onChange={(e) => handleChange(e, index)}
                      onBlur={(e) => handleBlur(e, `winAmount_${index}`)}
                      InputProps={{
                        classes: { input: classes.billedByInputs },
                      }}
                      helperText={
                        error.includes(`winAmount_${index}`) ? "Required" : ""
                      }
                      error={error.includes(`winAmount_${index}`)}
                    />
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #edf2f9" }}>
                    <TextField
                      type="number"
                      variant="outlined"
                      fullWidth
                      name="rate"
                      value={row.rate}
                      onChange={(e) => handleChange(e, index)}
                      placeholder="Rate"
                      onBlur={(e) => handleBlur(e, `rate_${index}`)}
                      InputProps={{
                        classes: { input: classes.billedByInputs },
                      }}
                      helperText={
                        error.includes(`rate_${index}`) ? "Required" : ""
                      }
                      error={error.includes(`rate_${index}`)}
                    />
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #edf2f9" }}>
                    <TextField
                      type="number"
                      variant="outlined"
                      disabled
                      name="total"
                      value={row.total}
                      fullWidth
                      placeholder="Total"
                      InputProps={{
                        classes: { input: classes.billedByInputs },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IndeterminateCheckBoxOutlinedIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => deleteRow(index)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Paper sx={{ width: "100px", mt: 3, textAlign: "center" }}>
        <Button
          sx={{ color: "black", textTransform: "capitalize", fontWeight: 500 }}
          onClick={addRow}
        >
          Add Row
        </Button>
      </Paper>
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={12} sm={6}>
          <AddTax
            finalTax={finalTax}
            subTotal={contingencySubTotal}
            setFinalTax={setFinalTax}
            grandTotal={continGrandTotal}
            setGrandTotal={setContinGrandTotal}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default ContingencyRate;
