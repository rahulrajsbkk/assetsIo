import React, { useState, useEffect } from 'react';
import btc from '../../../static/images/coin-color/bitcoin.svg';
import usdt from '../../../static/images/coin-color/tether.svg';
import indices from '../../../static/images/indices.svg';

function BondsControll({ setAssetTab }) {
  const [tabSelected, setTabSelected] = useState('stableCoin');
  useEffect(() => {
    try {
      setAssetTab(tabSelected);
    } catch (error) {}
  }, [tabSelected, setAssetTab]);
  return (
    <>
      <div className="earn-intrest-controll">
        <div
          className={`tab-item ${tabSelected === 'stableCoin'}`}
          onClick={() => setTabSelected('stableCoin')}
        >
          <img className="coin-img" src={usdt} alt="" />
          <div className="text-content">
            <h5>StableCoins</h5>
            <h6>Digital Assets Pegged To A Analog Asset</h6>
          </div>
        </div>
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
          className={`tab-item ${tabSelected === 'indices'}`}
          onClick={() => setTabSelected('indices')}
        >
          <img className="coin-img" src={indices} alt="" />
          <div className="text-content">
            <h5>Indices</h5>
            <h6>Basket Of Assets</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default BondsControll;
