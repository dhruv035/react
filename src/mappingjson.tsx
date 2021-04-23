import react, { useState } from "react";
import Losser from "./losser";
import {
  Typography,
  Grid,
  Button,
  Tab,
  Tabs,
  Box,
  AppBar
} from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

type Token = {
  id: string;
  symbol: string;
};
type Pair = {
  id: string;
  token0: Token;
  token1: Token;
};
interface Position {
  id: string;
  user: string;
  pair: Pair;
  liquidityTokenBalance: number;
}
type Props = {
  data: Position[];
};
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel({ children, index, value }: TabPanelProps) {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >
      <Box p={1}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps({ data }: Props, index: number) {
  return {
    label: `${data[index].pair.token0.symbol}-${data[index].pair.token1.symbol}`,
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

function Displayer({ data }: Props) {
  const [value, setValue] = useState(0);

  const handleChange = (event: react.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  if (data[0])
    return (
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            {data.map((element, index) => (
              <Tab {...a11yProps({ data }, index)}>
                {element.pair.token0.symbol}-{element.pair.token1.symbol}
              </Tab>
            ))}
          </Tabs>
        </AppBar>
        {data.map((element, index) => (
          <TabPanel value={value} index={index}>
            {data[index].liquidityTokenBalance}
            <Button variant="outlined">Historic Data</Button>
          </TabPanel>
        ))}

        {/*<Losser positionT0={data[0]} positionT1={data[1]}></Losser>*/}
      </div>
    );
  else
    return (
      <Typography component={"span"} variant={"body2"}>
        No Tokens
      </Typography>
    );
}
export default Displayer;
