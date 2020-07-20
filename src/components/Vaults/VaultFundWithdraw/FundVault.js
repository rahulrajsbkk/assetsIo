/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from 'react';
// import Lottie from 'react-lottie';
import Axios from 'axios';
import SelectCoin from './Fund/SelectCoin/SelectCoin';
import SetAmount from './Fund/SetAmount/SetAmount';
// import * as animationData from '../../static/animation/teris_cl_blue.json';
import { BankContext } from '../../../context/Context';

function FundVault({ openModal, setOpenModal }) {
  const [transCoin, setTransCoin] = useState('');
  const { email } = useContext(BankContext);
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
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData.default,
  //   rendererSettings: {
  //     preserveAspectRatio: 'xMidYMid slice',
  //   },
  // };
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
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
              price: value.price.USD,
            };
          });
          setPrice(priceObj);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [email]);

  return (
    <div className={`deposit-modal ${openModal ? '' : 'd-none'}`}>
      <div className="overlay-deposit" onClick={() => setOpenModal(false)} />
      <div className="deposit-card">
        {loading ? (
          <div className="m-auto">
            {/* <Lottie options={defaultOptions} height={150} width={150} /> */}
          </div>
        ) : transCoin === '' || !isCoinSelected ? (
          <SelectCoin
            setCoinObject={setCoinObject}
            setIsCoinSelected={setIsCoinSelected}
            price={price}
            transCoin={transCoin}
            setTransCoin={setTransCoin}
          />
        ) : (
          <SetAmount
            coinObject={coinObject}
            setCoinObject={setCoinObject}
            price={price}
            transCoin={transCoin}
            setTransCoin={setTransCoin}
          />
        )}
      </div>
    </div>
  );
}

export default FundVault;
