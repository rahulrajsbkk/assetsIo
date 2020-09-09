import React, { useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid/dist';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { FormatCurrency } from '../../utils/FunctionTools';
import DonutChart from '../DonutChart/Index';

import assetLogo from '../../static/images/assetsLogo.svg';
import { NetWorthContext } from '../../context/ NetWorthContext';
import { BankContext } from '../../context/Context';
import Skeleton from 'react-loading-skeleton';

function NetWorthChart() {
  const [segment, setSegment] = useState(null);
  const {
    cardList,
    assetClass,
    setAssetClass,
    assetCoin,
    setAssetCoin,
    liquidity,
    setLiquidity,
    selectedTotalBalance,
    loadingAppBalance,
    setTabData,
    tabData,
  } = useContext(NetWorthContext);
  const { coinNameObject } = useContext(BankContext);

  const [title, setTitle] = useState('Networth By Asset Class');

  function handleClick(e, data) {
    console.log(data.foo);
  }
  function newTab() {
    setTabData({
      ...tabData,
      [uuidv4()]: {
        assetClass,
        assetCoin,
        liquidity,
      },
    });
  }

  useEffect(() => {
    if (liquidity) {
      if (liquidity === 'Liquid') {
        setTitle(
          `Liquid ${
            coinNameObject &&
            coinNameObject[assetCoin] &&
            coinNameObject[assetCoin].coinSymbol
          }`
        );
      } else {
        setTitle(
          `${
            coinNameObject &&
            coinNameObject[assetCoin] &&
            coinNameObject[assetCoin].coinSymbol
          } Bonds`
        );
      }
    } else if (assetCoin) {
      setTitle(`${assetCoin}  Holdings`);
    } else if (assetClass) {
      setTitle(`${assetClass} Holdings`);
    } else {
      setTitle('Net-Worth');
    }
  }, [assetClass, assetCoin, liquidity, coinNameObject]);

  return (
    <>
      <ContextMenuTrigger className="chartSection" id="same_unique_identifier">
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
              &nbsp;&gt;&nbsp;
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
              &nbsp;&gt;&nbsp;
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
              &nbsp;&gt;&nbsp;
              <span onClick={() => {}}>{liquidity}</span>
            </>
          ) : (
            <></>
          )}
        </div>
        <div role="button" tabIndex="0" className="total mt-auto">
          <h6>{loadingAppBalance ? <Skeleton width="50%" /> : title}</h6>
          <h4>
            {loadingAppBalance ? (
              <Skeleton width="70%" />
            ) : (
              `$${FormatCurrency(selectedTotalBalance)}`
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
      </ContextMenuTrigger>

      <ContextMenu id="same_unique_identifier">
        <MenuItem data={{ foo: 'bar' }} onClick={handleClick}>
          Open In Current Tab
        </MenuItem>
        <MenuItem data={{ foo: 'bar' }} onClick={newTab}>
          Open In New Assets Tab
        </MenuItem>
        <MenuItem data={{ foo: 'bar' }} onClick={handleClick}>
          Open In New Browser Tab
        </MenuItem>
      </ContextMenu>
    </>
  );
}

export default NetWorthChart;
