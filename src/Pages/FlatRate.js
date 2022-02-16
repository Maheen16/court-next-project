import React, { useState, useEffect } from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  TableRow,
  TextField,
  TableBody,
  Paper,
  Button,
  Grid,
} from "@mui/material";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import { makeStyles } from "@mui/styles";
import AddTax from "../Components/AddTax";
const useStyles = makeStyles((theme) => ({
  billedByInputs: {
    border: "1px solid #dce4ec",
    padding: "6px",
    borderRadius: theme.shape.borderRadius,
  },
}));
function FlatRate({ FlatRateRef }) {
  const classes = useStyles();
  const rows = ["description", "flat rate", "total", " "];
  const [dynamicRows, setDynamicRows] = useState([
    {
      description: "",
      flatrate: "",
      total: "",
    },
  ]);
  const [flatSubTotal, setFlatSubTotal] = useState(0);
  const [flatGrandTotal, setFlatGrandTotal] = useState(0);
  const [finalTax, setFinalTax] = useState(0);
  const [error, updateError] = useState([]);
  const addRow = () => {
    let isAdd = true;
    let errorArr = [];
    dynamicRows.forEach((curRow, index) => {
      if (curRow.description === "" || curRow.flatrate === "") {
        isAdd = true;
      }
      if (!dynamicRows[index]["description"].trim()) {
        errorArr.push(`Description_${index}`);
      }
      if (!dynamicRows[index]["flatrate"]) {
        errorArr.push(`flatRate_${index}`);
      }
    });
    updateError(errorArr);
    const temp = [...dynamicRows];
    if (!isAdd) {
      temp.push({
        description: "",
        flatrate: "",
        total: "",
      });
    }
    setDynamicRows(temp);
  };
  const deleteRow = (index) => {
    const temp = [...dynamicRows]; //.....copying the state
    if (dynamicRows.length > 1) {
      temp.splice(index, 1);
    }
    setDynamicRows(temp);

    //..... on delete row updation of sub total.....
    let flatSubTotalVar = 0;

    temp.forEach((cur, i) => {
      flatSubTotalVar = flatSubTotalVar + parseFloat(cur.total);
    });
    setFlatSubTotal(flatSubTotalVar);
    //.....on delete setting the value of grand total

    let flatGrandTotal = 0;
    flatGrandTotal = flatSubTotalVar + finalTax;
    setFlatGrandTotal(flatGrandTotal);
    console.log("delete");
  };
  const handleChange = (e, index) => {
    const { name, value, type } = e.target;
    const temp = [...dynamicRows];
    temp[index][name] = value;
    setDynamicRows(temp);

    //.....setting total as flat rate
    if (value > 0) {
      temp[index]["total"] = temp[index]["flatrate"];

      // ..... when more than one row is added sumession of all total .....

      let flatSubTotalVar = 0;
      dynamicRows.forEach((cur, i) => {
        flatSubTotalVar = flatSubTotalVar + parseFloat(cur.total);
      });
      setFlatSubTotal(flatSubTotalVar);

      //..... updating value of grand total.....

      let flatGrandTotal = 0;
      flatGrandTotal = flatSubTotalVar + finalTax;
      setFlatGrandTotal(flatGrandTotal);
    } else if (value !== "" && type == "number") {
      let temp = [...dynamicRows];
      temp[index][name] = "";
      setDynamicRows(temp);
      alert("invalid value");
    }
  };

  const validateFlatRate = () => {
    let errorArr = [];
    console.log("i am fired");
    dynamicRows.forEach((obj, index) => {
      if (!dynamicRows[index]["description"].trim()) {
        errorArr.push(`Description_${index}`);
      }
      if (!dynamicRows[index]["flatrate"].trim()) {
        errorArr.push(`flatRate_${index}`);
      }
      updateError(errorArr);
    });
  };
  useEffect(() => {
    FlatRateRef.current = validateFlatRate;
  }, [FlatRateRef.current]);
  const handleBlur = (e, ele) => {
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
  return (
    <div>
      <Typography sx={{ fontWeight: "bold" }}>Total Fee:</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                textTransform: "uppercase",
                background: "#F9FBFD",
              }}
            >
              {rows.map((header, index) => {
                return (
                  <TableCell
                    key={index}
                    sx={{
                      border: "1px solid #edf2f9",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {header}
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
                      name="description"
                      placeholder="Description"
                      value={row.description}
                      onChange={(e) => handleChange(e, index)}
                      onBlur={(e) => handleBlur(e, `Description_${index}`)}
                      InputProps={{
                        classes: { input: classes.billedByInputs },
                      }}
                      helperText={
                        error.includes(`Description_${index}`)
                          ? "description"
                          : ""
                      }
                      error={error.includes(`Description_${index}`)}
                    />
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #edf2f9" }}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      type="number"
                      placeholder="Flat Rate"
                      name="flatrate"
                      value={row.flatrate}
                      onChange={(e) => handleChange(e, index)}
                      onBlur={(e) => handleBlur(e, `flatRate_${index}`)}
                      InputProps={{
                        classes: { input: classes.billedByInputs },
                      }}
                      helperText={
                        error.includes(`flatRate_${index}`) ? "flat rate" : ""
                      }
                      error={error.includes(`flatRate_${index}`)}
                    />
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #edf2f9" }}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      type="number"
                      disabled
                      name="total"
                      value={row.total}
                      onChange={(e) => handleChange(e, index)}
                      placeholder="0.00"
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
      <Paper sx={{ width: "100px", mt: 2, textAlign: "center" }}>
        <Button
          sx={{ color: "black", textTransform: "capitalize" }}
          onClick={addRow}
        >
          Add Row
        </Button>
      </Paper>
      <Grid container sx={{ mb: 3 }}>
        <Grid item xs={6}></Grid>
        <Grid item xs={12} sm={6}>
          <AddTax
            subTotal={flatSubTotal}
            grandTotal={flatGrandTotal}
            setFinalTax={setFinalTax}
            finalTax={finalTax}
            setGrandTotal={setFlatGrandTotal}
          />
        </Grid>
      </Grid>
    </div>
  );
}
export default FlatRate;
