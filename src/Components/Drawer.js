import React, { useState } from "react";
import {
  Drawer,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  AppBar,
  InputBase,
  IconButton,
  Badge,
  InputAdornment,
  Button,
  Avatar,
  Grid,
  Collapse,
} from "@mui/material";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import AlarmIcon from "@mui/icons-material/Alarm";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SummarizeIcon from "@mui/icons-material/Summarize";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { makeStyles } from "@mui/styles";
import NavCompo from "./NavCompo";

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
  root: {
    width: "calc(100% - 18%)",
    [theme.breakpoints.down("sm")]: {
      position: "fixed",
      top: 0,
      right: 0,
      left: 0,
      height: "65px",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  inputBase: {
    border: "2px solid #ccc",
    borderRadius: theme.shape.borderRadius,
    height: "5vh",
    padding: "20px",
  },

  badge: {
    "& .MuiBadge-badge": {
      right: 5,
      top: 2,
    },
  },
}));
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    position: "absolute",
    top: "27px",
    right: "22px",
  },
}));
const drawerWidth = 240;
function LeftBar(props) {
  const classes = useStyles();
  const [openList, setOpenList] = useState(false);
  const [openTask, setopenTask] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { window } = props;

  const handleDrawerToggle = () => {
    console.log(mobileOpen);
    setMobileOpen(!mobileOpen);
  };

  const handleClick = () => {
    setopenTask(!openTask);
  };
  const lists = [
    {
      id: 1,
      name: "My Cases",
      Icon: <WorkIcon />,
      subData1: {
        subName: "Add New Cases",
        subIcon: <AddIcon />,
      },
      subData2: {
        subName: "View All Cases",
        subIcon: <RemoveRedEyeIcon />,
      },
    },
    {
      id: 2,
      name: "Calender",
      Icon: <EventIcon />,
      subData1: {
        subName: "Create Event",
        subIcon: <AddIcon />,
      },
      subData2: {
        subName: "View Event",
        subIcon: <RemoveRedEyeIcon />,
      },
    },
    {
      id: 3,
      name: "Logs",
      Icon: <AlarmIcon />,
      subData1: {
        subName: "View All Logs",
        subIcon: <VisibilityIcon />,
      },
      subData2: {
        subName: "",
        subIcon: "",
      },
    },
    {
      id: 4,
      name: "Notes",
      Icon: <BookmarkBorderIcon />,
      subData1: {
        subName: "Add New Notes",
        subIcon: <AddIcon />,
      },
      subData2: {
        subName: "View All Notes",
        subIcon: <RemoveRedEyeIcon />,
      },
    },
  ];
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const drawer = (
    <div>
      <Grid container sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <Grid item xs={10}>
          <Typography sx={{ fontSize: "23px", textAlign: "left", ml: 2 }}>
            Logo
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <PushPinOutlinedIcon
            sx={{
              fontSize: "18px",
              background: "rgba(230, 230, 230, .15)",
              borderRadius: "50%",
              padding: "10px",
              color: "#8492a6",
            }}
          />
        </Grid>
      </Grid>
      <List>
        <ListItem className={classes.listitem} button>
          <ListItemText primary="Dashboard" />
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
        </ListItem>
        {lists.map((text, index) => (
          <NavCompo
            key={index}
            lists={lists}
            text={text}
            index={index}
            onClick={() => setOpenList(!openList)}
          />
        ))}
        <ListItem button className={classes.listitem}>
          <ListItemText primary="Documents" />
          <ListItemIcon>
            <SummarizeIcon />
          </ListItemIcon>
        </ListItem>

        <ListItem button className={classes.listitem} onClick={handleClick}>
          <Box className={classes.listname}>
            <ListItemText primary="Tasks" />
            {openTask ? <ExpandLess /> : <ExpandMore />}
          </Box>
          <ListItemIcon>
            <AssignmentTurnedInOutlinedIcon />
          </ListItemIcon>
        </ListItem>
        <Collapse in={openTask} timeout="auto" unmountOnExit>
          <List>
            <ListItem button className={classes.listitem}>
              <ListItemText primary="Add New Tasks" />
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
            </ListItem>
            <ListItem button className={classes.listitem}>
              <ListItemText primary="View All Tasks" />
              <ListItemIcon>
                <RemoveRedEyeIcon />
              </ListItemIcon>
            </ListItem>
          </List>
        </Collapse>
      </List>
    </div>
  );
  return (
    <div>
      <Box>
        <AppBar
          sx={{
            top: 0,
            position: "fixed",
            background: "white",
            color: "black",
            height: "4.5em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className={classes.root}
        >
          <Grid container sx={{ display: "flex", alignItems: "center" }}>
            <Grid
              item
              xs={6}
              sx={{
                pl: {
                  xs: "20px",
                  sm: "40px",
                },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <InputBase
                fullWidth
                variant="outlined"
                sx={{ paddingLeft: "25px" }}
                placeholder="Find A Case , Pre-Trial , File..."
                className={classes.inputBase}
                // InputProps={{
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: "35px", color: "#BDBDBD" }} />
                  </InputAdornment>
                }
                // }}
              />
            </Grid>
            <Grid item xs={6} sx={{ display: "flex" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Button
                  sx={{
                    bgcolor: "red",
                    color: "white",
                    display: { sm: "block", xs: "none" },
                  }}
                >
                  7 Days Trial Left
                </Button>
                <Box sx={{ marginRight: "27px", marginLeft: "20px" }}>
                  <Badge
                    color="primary"
                    variant="dot"
                    className={classes.badge}
                  >
                    <NotificationsNoneOutlinedIcon />
                  </Badge>
                </Box>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar alt="V" sx={{ background: "#12263F", mr: 2 }}>
                    V
                  </Avatar>
                </StyledBadge>
              </Box>
            </Grid>
          </Grid>
        </AppBar>
      </Box>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            width: drawerWidth,
            display: { xs: "block", sm: "none" },
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          anchor="left"
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </div>
  );
}

export default LeftBar;
