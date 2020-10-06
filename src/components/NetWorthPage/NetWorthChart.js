import React, { useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid/dist';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { FormatCurrency } from '../../utils/FunctionTools';
import DonutChart from '../DonutChart/Index';

import assetLogo from '../../static/images/assetsLogo.svg';
import { NetWorthContext } from '../../context/ NetWorthContext';
import { BankContext } from '../../context/Context';
import Skeleton from 'react-loading-skeleton';

function NetWorthChart({ match, setNetWorthMobileOpen }) {
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
    isBondRedeemed,
    setIsBondRedeemed,
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
            isBondRedeemed: false,
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
            isBondRedeemed: false,
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
            isBondRedeemed: false,
          },
        });
        break;
      case 'liquidity':
        setTabData({
          ...tabData,
          [uuidv4()]: {
            assetClass,
            assetCoin,
            liquidity,
            isBondRedeemed: false,
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
            isBondRedeemed,
          },
        });
        break;
    }
    setFilter(null);
  }

  const newWindow = () => {
    window.open(
      `${window.location.protocol}//${window.location.host}/${assetClass}/${assetCoin}/${liquidity}`,
      '_blank'
    );
  };

  function openInCurrent() {
    switch (filter) {
      case 'networth':
        setLiquidity(null);
        setAssetCoin(null);
        setAssetClass(null);
        setIsBondRedeemed(false);
        break;
      case 'assetClass':
        setLiquidity(null);
        setAssetCoin(null);
        setIsBondRedeemed(false);
        break;
      case 'assetCoin':
        setLiquidity(null);
        setIsBondRedeemed(false);
        break;
      case 'liquidity':
        setIsBondRedeemed(false);
        break;
      default:
        break;
    }
    setFilter(null);
  }
  useEffect(() => {
    if (isBondRedeemed) {
      setTitle(
        `Redeemed ${
          coinNameObject &&
          coinNameObject[assetCoin] &&
          coinNameObject[assetCoin].coinSymbol
        } Bonds`
      );
    } else if (liquidity) {
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
  }, [assetClass, assetCoin, liquidity, coinNameObject, isBondRedeemed]);

  return (
    <>
      <ContextMenuTrigger className="chartSection" id="same_unique_identifier">
        <div className="breadCrumbs">
          <span
            onContextMenuCapture={() => {
              setFilter('networth');
            }}
            onClick={() => {
              setAssetClass(null);
              setAssetCoin(null);
              setLiquidity(null);
              setIsBondRedeemed(false);
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
                  setIsBondRedeemed(false);
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
                  setIsBondRedeemed(false);
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
              <span
                onContextMenuCapture={() => {
                  setFilter('liquidity');
                }}
                onClick={() => {
                  setIsBondRedeemed(false);
                }}
              >
                {liquidity}
              </span>
            </>
          ) : (
            <></>
          )}
          {isBondRedeemed ? (
            <>
              &nbsp;&gt;&nbsp;
              <span onClick={() => {}}>Redeemed</span>
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
          <div className="chart" onClick={() => setNetWorthMobileOpen(true)}>
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
        {liquidity === 'Bonds' ? (
          isBondRedeemed ? (
            <div
              onContextMenuCapture={() => {
                setFilter('isBond');
              }}
              className="clickHere"
            >
              Click{' '}
              <span className="a" onClick={() => setIsBondRedeemed(false)}>
                Here
              </span>{' '}
              To Go Back To Active Bonds
            </div>
          ) : (
            <div
              onContextMenuCapture={() => {
                setFilter('isBond');
              }}
              className="clickHere"
            >
              Click{' '}
              <span
                className="a"
                onClick={() => {
                  setIsBondRedeemed(true);
                }}
              >
                Here
              </span>{' '}
              To See Your Redeemed Bonds
            </div>
          )
        ) : (
          ''
        )}
        <div className="clickText">
          Click The Assets Icon To See Your Portfolio Composition
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
