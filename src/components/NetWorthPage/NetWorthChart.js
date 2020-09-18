import React, { useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid/dist';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { FormatCurrency } from '../../utils/FunctionTools';
import DonutChart from '../DonutChart/Index';

import assetLogo from '../../static/images/assetsLogo.svg';
import { NetWorthContext } from '../../context/ NetWorthContext';
import { BankContext } from '../../context/Context';
import Skeleton from 'react-loading-skeleton';

function NetWorthChart({ match }) {
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

  useEffect(() => {
    if (!loadingAppBalance && match && match.params) {
      if (match.params.assetClass && match.params.assetClass !== 'null') {
        setAssetClass(match.params.assetClass);
        if (match.params.assetCoin && match.params.assetCoin !== 'null') {
          setAssetCoin(match.params.assetCoin);
          if (match.params.liquidity && match.params.liquidity !== 'null') {
            setLiquidity(match.params.liquidity);
          }
        }
      }
    }
    // eslint-disable-next-line
  }, [loadingAppBalance]);

  const [filter, setFilter] = useState(null);

  function newTab() {
    switch (filter) {
      case 'networth':
        setTabData({
          ...tabData,
          [uuidv4()]: {
            assetClass: null,
            assetCoin: null,
            liquidity: null,
          },
        });
        break;
      case 'assetClass':
        setTabData({
          ...tabData,
          [uuidv4()]: {
            assetClass,
            assetCoin: null,
            liquidity: null,
          },
        });
        break;
      case 'assetCoin':
        setTabData({
          ...tabData,
          [uuidv4()]: {
            assetClass,
            assetCoin,
            liquidity: null,
          },
        });
        break;
      default:
        setTabData({
          ...tabData,
          [uuidv4()]: {
            assetClass,
            assetCoin,
            liquidity,
          },
        });
        break;
    }
    setFilter(null);
  }

  const newWindow = () => {
    window.open(
      `http://localhost:3000/net-worth/${assetClass}/${assetCoin}/${liquidity}`,
      '_blank'
    );
  };

  function openInCurrent() {
    switch (filter) {
      case 'networth':
        setLiquidity(null);
        setAssetCoin(null);
        setAssetClass(null);
        break;
      case 'assetClass':
        setLiquidity(null);
        setAssetCoin(null);
        break;
      case 'assetCoin':
        setLiquidity(null);
        break;
      default:
        break;
    }
    setFilter(null);
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
            onContextMenuCapture={() => {
              setFilter('networth');
            }}
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
                onContextMenuCapture={() => {
                  setFilter('assetClass');
                }}
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
                onContextMenuCapture={() => {
                  setFilter('assetCoin');
                }}
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
        <MenuItem data={{ foo: 'bar' }} onClick={openInCurrent}>
          Open In Current Tab
        </MenuItem>
        <MenuItem data={{ foo: 'bar' }} onClick={newTab}>
          Open In New Assets Tab
        </MenuItem>
        <MenuItem data={{ foo: 'bar' }} onClick={newWindow}>
          Open In New Browser Tab
        </MenuItem>
      </ContextMenu>
    </>
  );
}

export default NetWorthChart;
