import React from 'react';
import ShowAmountIn from './ShowAmountIn';
import CollateralControlls from './CollateralControlls';
import CollateralAddedCard from './CollateralAddedCard';
import CollateralRatioCard from './CollateralRatioCard';
import CollateralLiquidated from './CollateralLiquidated';

function Collateral() {
  return (
    <div className="collateral-content">
      <h2>Collateral</h2>
      <ShowAmountIn />
      <CollateralControlls />
      <CollateralAddedCard />
      <CollateralRatioCard />
      <CollateralLiquidated />
    </div>
  );
}

export default Collateral;
