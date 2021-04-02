import react from "react";
import Losser from "./losser";

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
type Props={
    data: Position[]
    flag: number
    
}
function Displayer({data,flag}: Props){
    if(flag)
    return(
        <div>
                HELL
            {
                data.map((element, index)=>(
        <li key={index}>{element.liquidityTokenBalance  }</li>))
       
    }
     <Losser positionT0={data[0]} positionT1={data[1]}></Losser>
         
        </div>
    )
    else
    return(
        <div>
        <p>
            <h1>HELLO</h1>
        </p>
        </div>
    )
}
export default Displayer