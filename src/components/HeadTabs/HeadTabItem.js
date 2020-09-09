import React, { useContext, useEffect, useState } from 'react';
import { BankContext } from '../../context/Context';
import { NetWorthContext } from '../../context/ NetWorthContext';

function HeadTabItem({ index }) {
  const {
    tabIndex,
    setTabIndex,
    setAssetClass,
    setAssetCoin,
    setLiquidity,
    tabData,
  } = useContext(NetWorthContext);
  const { coinNameObject } = useContext(BankContext);
  const [title, setTitle] = useState('Net-Worth By Asset Class');
  const changeTab = () => {
    setAssetClass(tabData[index].assetClass);
    setAssetCoin(tabData[index].assetCoin);
    setLiquidity(tabData[index].liquidity);
    setTabIndex(index);
  };
  useEffect(() => {
    if (tabData[index].liquidity) {
      if (tabData[index].liquidity === 'Liquid') {
        setTitle(
          `Liquid ${
            coinNameObject &&
            coinNameObject[tabData[index].assetCoin] &&
            coinNameObject[tabData[index].assetCoin].coinSymbol
          } Holdings By Destination`
        );
      } else {
        setTitle(
          `${
            coinNameObject &&
            coinNameObject[tabData[index].assetCoin] &&
            coinNameObject[tabData[index].assetCoin].coinSymbol
          } Bonds By Destination`
        );
      }
    } else if (tabData[index].assetCoin) {
      setTitle(`${tabData[index].assetCoin} Holdings By Liquidity`);
    } else if (tabData[index].assetClass) {
      setTitle(`${tabData[index].assetClass} Holdings By Asset`);
    } else {
      setTitle('Net-Worth By Asset Class');
    }
  }, [tabData, index, coinNameObject]);
  return (
    <div className={`headTab ${tabIndex === index}`} onClick={changeTab}>
      <div className="text">{title}</div>
      <div className="bt-close">+</div>
    </div>
  );
}

export default HeadTabItem;
