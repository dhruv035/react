import axios from "axios";
import react, { useState, useEffect } from "react";
import Displayer from "./mappingjson";
import Query, { execute, Position } from "./query";
import Losser from "./losser";
import { Button, TextField, Grid, Card, Typography } from "@material-ui/core";
function Attempt() {
  let textInput = react.useRef<HTMLInputElement>(null);
  const [user, setUser] = useState("");
  const [resp, setResp] = useState("0");
  const [mapp, setMapp] = useState([]);
  const [value, setValue] = useState("");
  useEffect(() => {
    async function getData() {
      let response = await execute(Query(user));
      console.log(response);

      if (response.users[0]) {
        response = response.users[0];
        setResp(response.liquidityPositions[0].liquidityTokenBalance);
        setMapp(response.liquidityPositions);
      } else {
        setResp("0");
        setMapp([]);
        console.log("Nope");
      }
      console.log("Called");
    }
    if (user) getData();
  }, [user]);
  function handleChange(e: string | any) {
    if (e) {
      setValue(e.toLowerCase());
    } else setValue("0");
  }
  function handleClick() {
    setUser(value);
  }
  return (
    <Grid
      container
      direction="column"
      spacing={2}
      justify="center"
      alignItems="center"
    >
      <Grid container item xs={6} justify="center">
        <TextField
          id="address"
          type="text"
          label="Wallet Address"
          onChange={e => handleChange(e.target.value)}
        ></TextField>
      </Grid>
      <Grid container item xs={6} justify="center">
        <Button variant="contained" onClick={() => handleClick()}>
          Get Pairs
        </Button>
      </Grid>
      <Grid container item xs={6} justify="center">
        <Typography variant="h6">{parseFloat(resp)}</Typography>
      </Grid>
      <Grid container item xs={6} justify="center">
        <Displayer data={mapp} />
      </Grid>
    </Grid>
  );
}
export default Attempt;
