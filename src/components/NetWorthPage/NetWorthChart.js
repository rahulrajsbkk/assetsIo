import React, { useState, useContext, useEffect } from 'react';

import { FormatCurrency } from '../../utils/FunctionTools';
import DonutChart from '../DonutChart/Index';

import assetLogo from '../../static/images/assetsLogo.svg';
import { NetWorthContext } from '../../context/ NetWorthContext';

function NetWorthChart() {
  const [segment, setSegment] = useState(null);
  const {
    cardList,
    fiatBalance,
    cryptoBalance,
    assetClass,
    setAssetClass,
    assetCoin,
    setAssetCoin,
    liquidity,
    setLiquidity,
    icedValues,
  } = useContext(NetWorthContext);
  return (
    <div className="chartSection">
      <div className="breadCrumbs d-flex">
        <span
          onClick={() => {
            setAssetClass(null);
            setAssetCoin(null);
            setLiquidity(null);
          }}
        >
          Net-Worth
        </span>
        {assetClass ? (
          <>
            &gt;
            <span
              onClick={() => {
                setAssetCoin(null);
                setLiquidity(null);
              }}
            >
              {assetClass}
            </span>
          </>
        ) : (
          <></>
        )}
        {assetCoin ? (
          <>
            &gt;
            <span
              onClick={() => {
                setLiquidity(null);
              }}
            >
              {assetCoin}
            </span>
          </>
        ) : (
          <></>
        )}
        {liquidity ? (
          <>
            &gt;
            <span onClick={() => {}}>{liquidity}</span>
          </>
        ) : (
          <></>
        )}
      </div>
      <div role="button" tabIndex="0" className="total mt-auto">
        <h6>Your Net-Worth</h6>
        <h4>
          $
          {FormatCurrency(
            fiatBalance +
              cryptoBalance +
              icedValues.crypto.value +
              icedValues.fiat.value
          )}
        </h4>
      </div>
      <div className="chart-section mb-auto">
        <div className="chart">
          <div className="chartLogo">
            <img src={assetLogo} alt="" />
          </div>
          <DonutChart
            pieData={cardList}
            onMouseOver={(segmentIndex) => {
              setSegment(segmentIndex);
            }}
            onMouseOut={() => {
              setSegment(null);
            }}
            segment={segment}
          />
        </div>
      </div>
    </div>
  );
}

export default NetWorthChart;
