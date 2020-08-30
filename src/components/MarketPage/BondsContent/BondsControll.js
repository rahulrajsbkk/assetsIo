import React, { useState, useEffect } from 'react';
import btc from '../../../static/images/coin-color/bitcoin.svg';
import usdt from '../../../static/images/coin-color/tether.svg';
import indices from '../../../static/images/indices.svg';

function BondsControll({ setAssetTab }) {
  const [tabSelected, setTabSelected] = useState('cryptoCoin');
  useEffect(() => {
    try {
      setAssetTab(tabSelected);
    } catch (error) {}
  }, [tabSelected, setAssetTab]);
  return (
    <>
      <div className="earn-intrest-controll">
        <div
          className={`tab-item ${tabSelected === 'cryptoCoin'}`}
          onClick={() => setTabSelected('cryptoCoin')}
        >
          <img className="coin-img" src={btc} alt="" />
          <div className="text-content">
            <h5>Cryptocurrencies</h5>
            <h6>Assets Built On A Blockchain</h6>
          </div>
        </div>
        <div
          className={`tab-item ${tabSelected === 'stableCoin'}`}
          onClick={() => setTabSelected('stableCoin')}
        >
          <img className="coin-img" src={usdt} alt="" />
          <div className="text-content">
            <h5>StableCoins</h5>
            <h6>Digital Assets Pegged To An Analog Asset</h6>
          </div>
        </div>
        <div
          className={`tab-item ${tabSelected === 'fiat currencies'}`}
          onClick={() => setTabSelected('fiat currencies')}
        >
          <img className="coin-img" src={indices} alt="" />
          <div className="text-content">
            <h5>Fiat Currencies</h5>
            <h6>Assets Stablized In Ice</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default BondsControll;
