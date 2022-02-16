import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HourlyRate from "../Pages/HourlyRate";
import FlatRate from "../Pages/FlatRate";
import ContingencyRate from "../Pages/ContingencyRate";
import { Grid } from "@mui/material";
import TermsConditions from "./TermsConditions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({
  value,
  handleChange,
  HourlyRateRef,
  FlatRateRef,
  continRateRef,
}) {
  const [active, setActive] = React.useState(1);

  // .....toggling between classes.....
  const toggleClasses = (index) => {
    setActive(!active);
    setActive(index);
    console.log(index);
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              display: { sm: "flex", xs: "grid" },
              placeItems: { xs: "flex-start", sm: "flex-start" },
            }}
          >
            <Tab
              label="Hourly Rate"
              {...a11yProps(0)}
              onClick={() => toggleClasses(1)}
              sx={
                active === 1
                  ? {
                      textTransform: "capitalize",
                      borderColor: "#e3ebf6 ",
                      color: "#12263f !important",
                      backgroundColor: "#edf2f9",
                    }
                  : {}
              }
            />

            <Tab
              label="Flat Rate"
              {...a11yProps(1)}
              // className={classes.root}
              onClick={() => toggleClasses(2)}
              sx={
                active === 2
                  ? {
                      textTransform: "capitalize",
                      borderColor: "#e3ebf6 ",
                      color: "#12263f !important",
                      backgroundColor: "#edf2f9",
                    }
                  : {}
              }
            />
            <Tab
              label="Contingency Fee"
              {...a11yProps(2)}
              onClick={() => toggleClasses(3)}
              sx={
                active === 3
                  ? {
                      textTransform: "capitalize",
                      borderColor: "#e3ebf6 ",
                      color: "#12263f !important",
                      backgroundColor: "#edf2f9",
                    }
                  : {}
              }
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <HourlyRate
            // setHorlyRateAccess={setHorlyRateAccess}
            HourlyRateRef={HourlyRateRef}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FlatRate FlatRateRef={FlatRateRef} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ContingencyRate continRateRef={continRateRef} />
        </TabPanel>
      </Box>
      <TermsConditions />
    </>
  );
}
