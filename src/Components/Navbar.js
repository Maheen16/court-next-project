// import React, { useState } from "react";
// import {
//   AppBar,
//   InputBase,
//   Grid,
//   IconButton,
//   Badge,
//   Toolbar,
//   InputAdornment,
//   Box,
//   Button,
//   Avatar,
// } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import { styled } from "@mui/material/styles";
// import SearchIcon from "@mui/icons-material/Search";
// import MenuIcon from "@mui/icons-material/Menu";
// import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

// const StyledBadge = styled(Badge)(({ theme }) => ({
//   "& .MuiBadge-badge": {
//     backgroundColor: "#44b700",
//     color: "#44b700",
//     boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//     position: "absolute",
//     top: "27px",
//     right: "22px",
//   },
// }));
// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "calc(100% - 18%)",
//   },
//   inputBase: {
//     border: "2px solid #ccc",
//     borderRadius: theme.shape.borderRadius,
//     height: "5vh",
//     padding: "20px",
//     // "&:hover": {},
//   },

//   badge: {
//     "& .MuiBadge-badge": {
//       right: 5,
//       top: 2,
//     },
//   },
// }));
// function Navbar() {
//   const classes = useStyles();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };
//   return (
//     <Box>
//       <AppBar
//         sx={{
//           top: 0,
//           position: "fixed",
//           background: "white",
//           color: "black",
//           height: "4.5em",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//         className={classes.root}
//       >
//         <IconButton
//           color="inherit"
//           aria-label="open drawer"
//           edge="start"
//           onClick={handleDrawerToggle}
//           sx={{ mr: 2, display: { sm: "none" } }}
//         >
//           <MenuIcon />
//         </IconButton>
//         <Grid container>
//           <Grid item xs={6} sx={{ pl: (theme) => theme.spacing(5) }}>
//             <InputBase
//               fullWidth
//               variant="outlined"
//               sx={{ paddingLeft: "25px" }}
//               placeholder="Find A Case , Pre-Trial , File..."
//               className={classes.inputBase}
//               // InputProps={{
//               startAdornment={
//                 <InputAdornment position="start">
//                   <SearchIcon sx={{ fontSize: "35px", color: "#BDBDBD" }} />
//                 </InputAdornment>
//               }
//               // }}
//             />
//           </Grid>
//           <Grid item xs={6} sx={{ display: "flex" }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 alignItems: "center",
//                 width: "100%",
//               }}
//             >
//               <Button sx={{ bgcolor: "red", color: "white" }}>
//                 7 Days Trial Left
//               </Button>
//               <Box sx={{ marginRight: "27px", marginLeft: "20px" }}>
//                 <Badge color="primary" variant="dot" className={classes.badge}>
//                   <NotificationsNoneOutlinedIcon />
//                 </Badge>
//               </Box>
//               <StyledBadge
//                 overlap="circular"
//                 anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                 variant="dot"
//               >
//                 <Avatar alt="V" sx={{ background: "#12263F", mr: 2 }}>
//                   V
//                 </Avatar>
//               </StyledBadge>
//             </Box>
//           </Grid>
//         </Grid>
//       </AppBar>
//     </Box>
//   );
// }

// export default Navbar;
