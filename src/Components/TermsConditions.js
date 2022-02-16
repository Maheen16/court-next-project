import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
  InputBase,
} from "@mui/material";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";

function TermsConditions() {
  const [termsRow, setTermsRow] = useState([
    {
      terms: "",
    },
  ]);
  const addTermsRow = () => {
    const temp = [...termsRow];
    temp.push({ terms: "" });
    setTermsRow(temp);
  };
  const deleteTermsRow = (index) => {
    const temp = [...termsRow];
    temp.splice(index, 1);
    setTermsRow(temp);
    // console.log(index);
  };
  return (
    <>
      <TableContainer sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#F9FBFD" }}>
              <TableCell sx={{ border: "1px solid #edf2f9" }}>
                <Typography>Terms & Conditions</Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid #edf2f9" }}>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {termsRow?.map((terms, index) => {
              return (
                <TableRow key={index}>
                  <TableCell sx={{ border: "1px solid #edf2f9" }}>
                    <InputBase
                      variant="outlined"
                      fullWidth
                      placeholder="Description"
                      sx={{
                        border: "1px solid #dce4ec",
                        padding: "3px",
                        // borderRadius: (theme) => theme.shape.borderRadius,
                      }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center", border: "1px solid #edf2f9" }}
                  >
                    <IndeterminateCheckBoxOutlinedIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => deleteTermsRow(index)}
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
          onClick={addTermsRow}
        >
          Add Row
        </Button>
      </Paper>
    </>
  );
}

export default TermsConditions;
