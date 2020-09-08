import React, { useContext, useEffect, useState } from 'react';
import { NetWorthContext } from '../../context/ NetWorthContext';
import { BankContext } from '../../context/Context';

function HeadTabs() {
  const { assetClass, assetCoin, liquidity } = useContext(NetWorthContext);
  const { coinNameObject } = useContext(BankContext);
  const [title, setTitle] = useState('Networth By Asset Class');
  useEffect(() => {
    if (liquidity) {
      if (liquidity === 'Liquid') {
        setTitle(
          `Liquid ${
            coinNameObject &&
            coinNameObject[assetCoin] &&
            coinNameObject[assetCoin].coinSymbol
          } Holdings By Destination`
        );
      } else {
        setTitle(
          `${
            coinNameObject &&
            coinNameObject[assetCoin] &&
            coinNameObject[assetCoin].coinSymbol
          } Bonds By Destination`
        );
      }
    } else if (assetCoin) {
      setTitle(`${assetCoin} Holdings By Liquidity`);
    } else if (assetClass) {
      setTitle(`${assetClass} Holdings By Asset`);
    } else {
      setTitle('Networth By Asset Class');
    }
  }, [assetClass, assetCoin, liquidity]);
  return (
    <div className="headTabsWrapper">
      <div className="headTab true">
        <div className="text">{title}</div>
        <div className="bt-close">+</div>
      </div>
      {/* <div className="headTab">
        <div className="text">Networth By Asset Class</div>
        <div className="bt-close">+</div>
      </div> */}
    </div>
  );
}

export default HeadTabs;
