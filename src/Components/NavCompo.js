import React, { useState } from "react";
import {
  List,
  ListItem,
  Box,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
const useStyles = makeStyles((theme) => ({
  listitem: {
    padding: 0,
    paddingLeft: "17px",
    marginTop: theme.spacing(4),
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    "&:hover": {
      color: "#061D3B !important",
    },
  },
  listname: {
    display: "flex",
    alignItems: "center",
  },
}));
function NavCompo({ text, index, Lists }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  return (
    <div key={index}>
      <ListItem
        button
        className={classes.listitem}
        onClick={() => setOpen(!open)}
      >
        <Box className={classes.listname}>
          <ListItemText primary={text.name} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </Box>
        <ListItemIcon>{text.Icon}</ListItemIcon>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          <ListItem button className={classes.listitem}>
            <ListItemText primary={text.subData1.subName} />
            <ListItemIcon>{text.subData1.subIcon}</ListItemIcon>
          </ListItem>
          <ListItem button className={classes.listitem}>
            <ListItemText primary={text.subData2.subName} />
            <ListItemIcon>{text.subData2.subIcon}</ListItemIcon>
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
}

export default NavCompo;
