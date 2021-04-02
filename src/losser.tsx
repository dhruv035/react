import react from 'react';

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
    positionT0:Position
    positionT1:Position
}

function Losser({positionT0,positionT1}:Props){
const t0Ownership = positionT0.liquidityTokenBalance / positionT0.liquidityTokenTotalSupply
const t1Ownership = positionT0.liquidityTokenBalance / positionT1.liquidityTokenTotalSupply  
const token0_amount_t0 = t0Ownership * positionT0.reserve0
  const token1_amount_t0 = t0Ownership * positionT0.reserve1

  // get current token values
  const token0_amount_t1 = t1Ownership * positionT1.reserve0
  const token1_amount_t1 = t1Ownership * positionT1.reserve1

  // calculate squares to find imp loss and fee differences
  const sqrK_t0 = Math.sqrt(token0_amount_t0 * token1_amount_t0)
  // eslint-disable-next-line eqeqeq
  const priceRatioT1 = positionT1.token0PriceUSD != 0 ? positionT1.token1PriceUSD / positionT1.token0PriceUSD : 0

  const token0_amount_no_fees = positionT1.token1PriceUSD && priceRatioT1 ? sqrK_t0 * Math.sqrt(priceRatioT1) : 0
  const token1_amount_no_fees =
    Number(positionT1.token1PriceUSD) && priceRatioT1 ? sqrK_t0 / Math.sqrt(priceRatioT1) : 0
  const no_fees_usd =
    token0_amount_no_fees * positionT1.token0PriceUSD + token1_amount_no_fees * positionT1.token1PriceUSD

  const difference_fees_token0 = token0_amount_t1 - token0_amount_no_fees
  const difference_fees_token1 = token1_amount_t1 - token1_amount_no_fees
  const difference_fees_usd =
    difference_fees_token0 * positionT1.token0PriceUSD + difference_fees_token1 * positionT1.token1PriceUSD

  // calculate USD value at t0 and t1 using initial token deposit amounts for asset return
  const assetValueT0 = token0_amount_t0 * positionT0.token0PriceUSD + token1_amount_t0 * positionT0.token1PriceUSD
  const assetValueT1 = token0_amount_t0 * positionT1.token0PriceUSD + token1_amount_t0 * positionT1.token1PriceUSD

  const imp_loss_usd = no_fees_usd - assetValueT1
  const uniswap_return = difference_fees_usd + imp_loss_usd
  console.log(imp_loss_usd)
  return (
    <div>
        <p>
        {imp_loss_usd}<br></br>
        {assetValueT1}<br></br>
        HELLLZZOO
        </p>
    </div>)
}
export default Losser;