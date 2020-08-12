/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from 'react';
import Lottie from 'react-lottie';
import Axios from 'axios';
import SelectCoin from './Fund/SelectCoin/SelectCoin';
import SetAmount from './Fund/SetAmount/SetAmount';
import * as animationData from '../../../static/animations/cpu-loading.json';
import { BankContext } from '../../../context/Context';

function FundVault({
  fundOrWithdraw = 'Deposit',
  openModal,
  setOpenModal,
  isDeposit,
}) {
  const [transCoin, setTransCoin] = useState('');
  const { email, coinListObject } = useContext(BankContext);
  const [coinObject, setCoinObject] = useState({
    sym: '$',
    symbol: 'USD',
    price: 1,
  });
  const [isCoinSelected, setIsCoinSelected] = useState(false);
  const [price, setPrice] = useState({
    USD: 0,
    BTC: 0,
    ETH: 0,
    USDT: 0,
  });
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    if (coinListObject && coinListObject.USD)
      Axios.get(
        `https://comms.globalxchange.com/coin/vault/coins_data?email=${email}`
      )
        .then((res) => {
          if (res.data.status) {
            const coin = res.data.coins;
            const priceObj = {};
            coin.forEach((value) => {
              priceObj[value.coinSymbol] = {
                coinValue: value.coinValue,
                value: value.coinValueUSD,
                sym: value.symbol,
                symbol: value.coinSymbol,
                price: coinListObject[value.coinSymbol].price.USD,
              };
            });
            setPrice(priceObj);
          }
        })
        .finally(() => {
          setLoading(false);
        });
  }, [email, coinListObject]);

  return (
    <div className={`deposit-modal ${openModal ? '' : 'd-none'}`}>
      <div
        className="overlay-deposit"
        role="button"
        tabIndex="-1"
        onClick={() => setOpenModal(false)}
      />
      <div className="deposit-card">
        <div className="title">{fundOrWithdraw}</div>
        {loading ? (
          <div className="m-auto">
            <Lottie options={defaultOptions} height={150} width={150} />
          </div>
        ) : transCoin === '' || !isCoinSelected ? (
          <SelectCoin
            isDeposit={isDeposit}
            setCoinObject={setCoinObject}
            setIsCoinSelected={setIsCoinSelected}
            price={price}
            transCoin={transCoin}
            setTransCoin={setTransCoin}
            fundOrWithdraw={fundOrWithdraw}
          />
        ) : (
          <SetAmount
            coinObject={coinObject}
            setCoinObject={setCoinObject}
            price={price}
            transCoin={transCoin}
            setTransCoin={setTransCoin}
            isDeposit={isDeposit}
          />
        )}
      </div>
    </div>
  );
}

export default FundVault;
