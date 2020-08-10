/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable indent */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
// import Lottie from 'react-lottie';
import { BankContext } from '../../../../../context/Context';
// import bets from '../../../static/images/logo-b-blue.svg';
// import vault from '../../../static/images/vault.svg';
// import * as animationData from '../../../static/animation/wallet-coin.json';

function SetAmount({ fundOrWithdraw, coinObject, price, transCoin }) {
  // eslint-disable-next-line object-curly-newline
  const { email, idToken, name, rates } = useContext(BankContext);

  const [ratesWithUsd, setRatesWithUsd] = useState({
    BTC: 9295.91,
    ETH: 198.2,
    GXT: 1.07028,
    USDT: 1.001,
    LTC: 42.93,
    XRP: 0.2011,
    XMR: 64.64,
    USD: 1,
  });
  useEffect(() => {
    setRatesWithUsd({ ...rates, USD: 1 });
  }, [rates]);

  const [depositAsset, setDepositAsset] = useState('');
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData.default,
  //   rendererSettings: {
  //     preserveAspectRatio: 'xMidYMid slice',
  //   },
  // };

  const [loading, setLoading] = useState(false);
  const [messageobj, setMessage] = useState('');
  const depositWithdraw = () => {
    const config = {
      headers: {
        email,
        token: idToken,
      },
    };
    Axios.post(
      'https://betsapi.globalxchange.io/topup_bets_vault',
      {
        email,
        source_coin: transCoin.toLowerCase(), // vault of gxnitrous
        dest_coin: 'btc', // vault of bets
        amount: parseFloat(depositAsset / price.BTC.price), // amount of destination coin
      },
      config
    )
      .then((res) => {
        // console.log('depositWithdraw :>> ', res.data);
        setMessage(res.data);
        // message.info(res.data.payload);
      })
      .catch((err) => {
        console.log('depositWithdraw :>> ', err);

        setMessage({ status: false, message: 'Something Went Wrong' });
      });
  };
  const [selectedCoinAmount, setSelectedCoinAmount] = useState('');
  const selectedChange = (e) => {
    setSelectedCoinAmount(e.target.value);
    setDepositAsset(
      e.target.value === ''
        ? ''
        : (coinObject.price * e.target.value).toFixed(2)
    );
  };
  const depositOnChange = (e) => {
    setDepositAsset(e.target.value);
    setSelectedCoinAmount(
      e.target.value === ''
        ? ''
        : Math.round(
            (e.target.value / coinObject.price + Number.EPSILON) * 100000
          ) / (100000).toPrecision(5)
    );
  };
  useEffect(() => {
    if (messageobj !== '') {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [messageobj]);

  function formatNum(num, symbol) {
    if (symbol === 'BTC' || symbol === 'ETH') {
      if (num >= 10) {
        return new Intl.NumberFormat('en-US', {
          maximumFractionDigits: 3,
          minimumFractionDigits: 3,
        }).format(num);
      }
      return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 4,
        minimumFractionDigits: 4,
      }).format(num);
    }
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(num);
  }

  return (
    <>
      {loading ? (
        <div className="d-flex flex-column" style={{ height: 300 }}>
          {loading && messageobj === '' ? (
            // <Lottie options={defaultOptions} height={300} width={150} />
            ''
          ) : (
            <>
              {messageobj.status ? (
                <>
                  <h3 className="text-white text-center mx-4 mt-auto">
                    Congratulations
                  </h3>
                  <h4 className="text-white text-center mx-4 mb-auto">
                    ${depositAsset}
                    &nbsp;Has Been Deposited Into Your Bets Account
                  </h4>
                </>
              ) : (
                <h4 className="text-white text-center mx-4 my-auto">
                  {messageobj.message}
                </h4>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="set-amount">
          <div className="group m-4">
            <p className="mb-2">From</p>
            <div className="border-wrap d-flex flex-column select-sym">
              <div className="d-flex drop-togle">
                <img
                  src="https://cryptolottery.com/static/media/vault.80bf781f.svg"
                  alt=""
                  className="icon"
                />
                <div className="flex-grow-1 my-auto">
                  <h4>
                    <span>{name}</span>
                    &apos;s
                    {transCoin.toUpperCase()}
                    &nbsp;Vault
                  </h4>
                  <h6>
                    {formatNum(
                      price[transCoin.toUpperCase()].coinValue,
                      price[transCoin.toUpperCase()].symbol
                    )}
                    {price[transCoin.toUpperCase()].symbol}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="group m-4">
            <p className="mb-2">To</p>
            <div className="border-wrap d-flex">
              <div className="d-flex">
                <img
                  src="https://cryptolottery.com/static/media/logo-b-blue.0a211fe4.svg"
                  alt=""
                  className="icon"
                />
                <div className="flex-grow-1 my-auto">
                  <h4>Bets BTC &nbsp;Account</h4>
                  <h6>
                    {formatNum(0, 'BTC')}
                    &nbsp; BTC
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="group m-4">
            <p className="mb-2 d-flex">
              <span className="col-6 p-0">
                {transCoin}
                &nbsp;Vault Debit
              </span>
              <span className="col-6 p-0">USD Value</span>
            </p>
            <div className="border-wrap p-0 d-flex">
              <input
                value={selectedCoinAmount}
                onChange={selectedChange}
                type="number"
                className="amount-input d-flex h-100 col-6"
                placeholder="0.0000"
              />
              <input
                value={depositAsset}
                onChange={depositOnChange}
                type="number"
                className="amount-input d-flex h-100 col-6 border-left"
                placeholder="$0.00"
              />
            </div>
          </div>
          {transCoin.toLowerCase() !== 'btc' ? (
            <div className="m-4 coin-detail">
              <div className="d-flex justify-content-between mt-4">
                <h5>Available To Deposit</h5>
                <h5>
                  {formatNum(
                    price[transCoin.toUpperCase()].coinValue,
                    price[transCoin.toUpperCase()].symbol
                  )}
                  &nbsp;
                  {price[transCoin.toUpperCase()].symbol}
                </h5>
              </div>
              <div className="d-flex justify-content-between">
                <h6>Funds On Hold</h6>
                <h6>
                  {formatNum(0, 'BTC')}
                  &nbsp; BTC
                </h6>
              </div>
              <div className="d-flex justify-content-between mt-4">
                <h5>
                  {coinObject.sym.length > 1 ? '' : coinObject.sym}
                  1.00&nbsp;
                  {coinObject.symbol}
                </h5>
                <h5>
                  {formatNum(coinObject.price / ratesWithUsd.BTC, 'BTC')}
                  &nbsp; BTC
                </h5>
              </div>
              <div className="d-flex justify-content-between my-4">
                <h5>Proccesing Time</h5>
                <h5>Instant</h5>
              </div>
            </div>
          ) : (
            ''
          )}
          <div
            role="button"
            tabIndex={0}
            className="deposit-footer"
            onClick={() => {
              depositWithdraw();
              setLoading(true);
            }}
          >
            {fundOrWithdraw}
          </div>
        </div>
      )}
    </>
  );
}

export default SetAmount;
