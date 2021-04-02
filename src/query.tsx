import axios from "axios";
import react,{useState,useEffect} from "react";
import Displayer from "./mappingjson";

const uniSubgraphUrl = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"
interface Position {
  pair: any
  liquidityTokenBalance: number
  liquidityTokenTotalSupply: number
  reserve0: number
  reserve1: number
  reserveUSD: number
  token0PriceUSD: number
  token1PriceUSD: number
}
async function execute (query: string, variable = {}) {
  const response = await axios.post(uniSubgraphUrl, {
    query,
    variable,
    crossdomain: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "json",
    }
  });

  if (response.status === 200) return response.data.data;
  else return null;
};
export { execute };
  export type { Position };
function Query (user:string){
let query = `{
  liquidityPositionSnapshots (
    where:{
      user: "${user}",
      pair_contains: "0x2fdbadf3c4d5a8666bc06645b8358ab803996e28",
      liquidityTokenBalance_gt: 0,
      
    }
  ) {
    pair
    {
      id
    }
    liquidityTokenBalance
      liquidityTokenTotalSupply
      reserve0
      reserve1
      reserveUSD
      token0PriceUSD
      token1PriceUSD
    }
  }`
return query
}
export default Query

// TODO: figure out what happens when all liquidity is removed and re-supplied later

