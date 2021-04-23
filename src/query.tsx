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
  users(where: {id:"${user}"})
{
  liquidityPositions{
    
    pair{
      id
      token0{
        id
        symbol
      }
      token1{
        id
        symbol
      }
    }
    liquidityTokenBalance
  }
}  
}`
return query
}
export default Query

// TODO: figure out what happens when all liquidity is removed and re-supplied later

