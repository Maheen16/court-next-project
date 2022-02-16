import React, { useState, useEffect } from "react";
import { Button, Paper, Grid, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import AddTax from "../Components/AddTax";
const rows = ["Description", "number of hours", "rate per hour", "total", "  "];
const useStyles = makeStyles((theme) => ({
  billedByInputs: {
    border: "1px solid #dce4ec",
    padding: "6px",
    borderRadius: theme.shape.borderRadius,
  },
}));
function HourlyRate({ HourlyRateRef }) {
  const classes = useStyles();
  const [dynamicRows, setDynamicRows] = useState([
    {
      Description: "",
      numberOfHours: "",
      ratePerHour: "",
      total: "",
    },
  ]);
  const [subTotal, setSubTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [finalTax, setFinalTax] = useState(0);
  const [error, updateError] = useState([]);

  // .....adding new row dynamically.....

  const addRow = () => {
    let temp = [...dynamicRows];
    let errorArr = [];
    let isValid = true;
    dynamicRows.forEach((curRow, i) => {
      if (
        curRow.Description === "" ||
        curRow.numberOfHours === "" ||
        curRow.ratePerHour === ""
      ) {
        isValid = false;
      }
      if (!dynamicRows[i]["Description"].trim()) {
        errorArr.push(`Description_${i}`);
      }
      if (!dynamicRows[i]["numberOfHours"].trim()) {
        errorArr.push(`numberOfHours_${i}`);
      }
      if (!dynamicRows[i]["ratePerHour"].trim()) {
        errorArr.push(`ratePerHour_${i}`);
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
        numberOfHours: "",
        ratePerHour: "",
        total: "",
      });
      setDynamicRows(temp);
    }
  };

  //.....Performing deletion of row from state.....

  const deleteRow = (index) => {
    const temp = [...dynamicRows];
    temp.splice(index, 1);
    setDynamicRows(temp);

    // .....updating subtotal on delete row.....
    console.log(temp);
    let subtotal = 0;
    temp.forEach((arr) => {
      subtotal = subtotal + arr.total;
      // console.log(arr, temp);
    });
    setSubTotal(subtotal);
    // .....updating grand total on delete row.....

    let grandtotalvar = 0;
    grandtotalvar = parseFloat(subtotal + finalTax);
    setGrandTotal(grandtotalvar);
    // console.log(grandtotalvar, subtotal);
  };
  const handleChange = (e, index) => {
    const { name, value, type } = e.target;
    let temp = [...dynamicRows];
    temp[index][name] = value;
    setDynamicRows(temp);
    temp[index]["isAdd"] = true;
    if (value > 0) {
      // ..... calculating total amount for row.....
      temp[index]["total"] =
        temp[index]["numberOfHours"] * temp[index]["ratePerHour"];
      setDynamicRows(temp);
      // .....updating subtotal on new adding row.....

      let subtotal = 0;
      dynamicRows.forEach((arr, index) => {
        subtotal = subtotal + arr.total;
      });
      setSubTotal(subtotal);

      //..... updating grandtotal on new adding row with tax....

      let grandtotalvar = 0;
      grandtotalvar = parseFloat(subtotal + finalTax);
      setGrandTotal(grandtotalvar);
    } else {
      temp[index]["total"] = 0;
    }
  };

  const validateHourlyRate = () => {
    let errorArr = [];
    // console.log("i am fired");
    dynamicRows.forEach((obj, i) => {
      console.log("inside forEach");
      if (!dynamicRows[i]["Description"].trim()) {
        errorArr.push(`Description_${i}`);
      }
      if (!dynamicRows[i]["numberOfHours"].trim()) {
        errorArr.push(`numberOfHours_${i}`);
      }
      if (!dynamicRows[i]["ratePerHour"].trim()) {
        errorArr.push(`ratePerHour_${i}`);
      }
      // else {
      //   let errMsgInd = error.indexOf(`ratePerHour_${i}`);
      //   error.splice(errMsgInd, 1);
      // }
      // if (error.length > 0) {
      // } else {
      //   updateError([]);
      // }
      updateError(errorArr);
    });
  };

  //..... Updation of field on blur ......

  const handleBlur = (e, ele) => {
    // console.log("blurred");
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
    HourlyRateRef.current = validateHourlyRate;
  }, [HourlyRateRef.current]);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow
                  sx={{
                    textTransform: "uppercase",
                    background: "#F9FBFD",
                  }}
                >
                  {rows.map((title, index) => {
                    return (
                      <TableCell
                        key={index}
                        component="th"
                        sx={{
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
                          type="text"
                          name="Description"
                          value={row.Description}
                          placeholder="Description"
                          onChange={(e) => handleChange(e, index)}
                          onBlur={(e) => handleBlur(e, `Description_${index}`)}
                          InputProps={{
                            classes: { input: classes.billedByInputs },
                          }}
                          helperText={
                            error.includes(`Description_${index}`)
                              ? "Required"
                              : ""
                          }
                          error={error.includes(`Description_${index}`)}
                        />
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #edf2f9" }}>
                        <TextField
                          type="number"
                          variant="outlined"
                          fullWidth
                          placeholder="Hours"
                          name="numberOfHours"
                          min="1"
                          onChange={(e) => handleChange(e, index)}
                          onBlur={(e) =>
                            handleBlur(e, `numberOfHours_${index}`)
                          }
                          value={row.numberOfHours}
                          InputProps={{
                            classes: { input: classes.billedByInputs },
                          }}
                          helperText={
                            error.includes(`numberOfHours_${index}`)
                              ? "hours"
                              : ""
                          }
                          error={error.includes(`numberOfHours_${index}`)}
                        />
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #edf2f9" }}>
                        <TextField
                          type="number"
                          variant="outlined"
                          fullWidth
                          placeholder="Rate per hours"
                          name="ratePerHour"
                          value={row.ratePerHour}
                          onChange={(e) => handleChange(e, index)}
                          onBlur={(e) => handleBlur(e, `ratePerHour_${index}`)}
                          InputProps={{
                            classes: { input: classes.billedByInputs },
                          }}
                          helperText={
                            error.includes(`ratePerHour_${index}`) ? "rate" : ""
                          }
                          error={error.includes(`ratePerHour_${index}`)}
                        />
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #edf2f9" }}>
                        <TextField
                          type="number"
                          variant="outlined"
                          fullWidth
                          disabled
                          placeholder="Total"
                          value={row.total}
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
              sx={{
                color: "black",
                textTransform: "capitalize",
                fontWeight: 500,
              }}
              onClick={(e) => addRow(e)}
            >
              Add Row
            </Button>
            {/* <Button onClick={() => validateHourlyRate()}>validate</Button> */}
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={12} sm={6}>
          <AddTax
            subTotal={subTotal}
            grandTotal={grandTotal}
            setGrandTotal={setGrandTotal}
            setFinalTax={setFinalTax}
            finalTax={finalTax}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default HourlyRate;
