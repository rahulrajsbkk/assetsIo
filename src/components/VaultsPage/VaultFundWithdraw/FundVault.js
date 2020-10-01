/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { BankContext } from '../../../context/Context';
import SelectVault from './Fund/SelectVault/SelectVault';
import SelectCoinDirection from './Fund/SelectCoinDirection/SelectCoinDirection';
import SelectAndConfirmAmount from './Fund/SelectAndConfirmAmount/SelectAndConfirmAmount';

function FundVault({ openModal, setOpenModal, isDeposit }) {
  const [transCoin, setTransCoin] = useState('');
  const { email, coinListObject } = useContext(BankContext);
  const [coinObject, setCoinObject] = useState({
    sym: '$',
    symbol: 'USD',
    price: 1,
  });
  const [price, setPrice] = useState({
    USD: 0,
    BTC: 0,
    ETH: 0,
    USDT: 0,
  });

  const [loading, setLoading] = useState(true);
  const [priceList, setPriceList] = useState([]);

  const [selectVault, setSelectVault] = useState(true);
  const [appFrom, setAppFrom] = useState({});

  useEffect(() => {
    if (appFrom.app_code) {
      if (appFrom.app_code === 'gx') {
        setLoading(true);
        if (coinListObject && coinListObject.USD)
          Axios.get(
            `https://comms.globalxchange.com/coin/vault/coins_data?email=${email}`
          )
            .then((res) => {
              if (res.data.status) {
                const coin = res.data.coins;
                setPriceList(coin);
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
      } else {
        Axios.post(
          'https://comms.globalxchange.com/coin/vault/service/coins/get',
          {
            app_code: appFrom.app_code,
            profile_id: appFrom.profile_id,
          }
        )
          .then((res) => {
            const { data } = res;
            if (data.status) {
              const { coins_data } = data;
              setPriceList(coins_data);
              const priceObj = {};
              coins_data.forEach((value) => {
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
      }
    }
  }, [appFrom, coinListObject, email]);

  return (
    <div className={`deposit-modal ${openModal ? '' : 'd-none'}`}>
      <div
        className="overlay-deposit"
        role="button"
        tabIndex="-1"
        onClick={() => setOpenModal(false)}
      />
      {selectVault ? (
        <SelectVault
          setAppFrom={setAppFrom}
          setSelectVault={setSelectVault}
          isDeposit={isDeposit}
        />
      ) : transCoin === '' ? (
        <SelectCoinDirection
          appFrom={appFrom}
          isDeposit={isDeposit}
          setCoinObject={setCoinObject}
          price={price}
          transCoin={transCoin}
          setTransCoin={setTransCoin}
          priceList={priceList}
          loading={loading}
        />
      ) : (
        <SelectAndConfirmAmount
          coinObject={coinObject}
          setCoinObject={setCoinObject}
          appFrom={appFrom}
          transCoin={transCoin}
          setTransCoin={setTransCoin}
          isDeposit={isDeposit}
          setOpenModal={setOpenModal}
        />
      )}
      )}
    </div>
  );
}

export default FundVault;
