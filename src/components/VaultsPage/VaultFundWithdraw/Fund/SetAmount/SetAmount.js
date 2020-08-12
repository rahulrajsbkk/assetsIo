/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable indent */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid/dist';
import Axios from 'axios';
import jwt from 'jsonwebtoken';
import Lottie from 'react-lottie';
import * as animationData from '../../../../../static/animations/cpu-loading.json';
import { BankContext } from '../../../../../context/Context';
import { VaultContext } from '../../../../../context/VaultContext';
import logo from '../../../../../static/images/logo.svg';

function SetAmount({ coinObject, price, transCoin, isDeposit }) {
  const { email, idToken, name, profileId, tostShowOn } = useContext(
    BankContext
  );
  const { updateBalance } = useContext(VaultContext);

  const [depositAsset, setDepositAsset] = useState('');
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const [loading, setLoading] = useState(false);
  const [messageobj, setMessage] = useState('');
  const depositWithdraw = () => {
    const key = 'HUBQTVce7cUde4F';
    const obj = {
      email,
      token: idToken,
      app_code: 'ice',
      profile_id: profileId,
      value: parseFloat(selectedCoinAmount), // amount to debit
      coin: transCoin,
      identifier: uuidv4(),
      credit_from: isDeposit ? 'Fund Iced From GX Vault' : '',
      payment_for: isDeposit ? '' : 'Withdraw To GX Vault From Iced',
    };
    let encoded = jwt.sign(obj, key, { algorithm: 'HS512' });

    Axios.post(
      `https://comms.globalxchange.com/coin/vault/service/${
        isDeposit ? 'credit' : 'debit'
      }`,
      {
        data: encoded,
      }
    )
      .then((res) => {
        const { data } = res;
        setMessage(data);
        if (data.status) {
          tostShowOn('Transactin Succes');
        }
      })
      .catch((err) => {
        setMessage({
          status: false,
          message: err.message ? err.err : 'Something Went Wrong',
        });
      })
      .finally(() => {
        setLoading(false);
        updateBalance();
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
            <Lottie options={defaultOptions} height={150} width={150} />
          ) : (
            <>
              {messageobj.status ? (
                <>
                  <h3 className="text-white text-center mx-4 mt-auto">
                    Congratulations
                  </h3>
                  <h4 className="text-white text-center mx-4 mb-auto">
                    {isDeposit ? (
                      <>
                        ${depositAsset}
                        &nbsp;Has Been Deposited Into Your Iced Account
                      </>
                    ) : (
                      <>
                        ${depositAsset}
                        &nbsp;Has Been Withdrawn From Your Iced Account
                      </>
                    )}
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
                <img src={logo} alt="" className="icon" />
                <div className="flex-grow-1 my-auto">
                  <h4>Iced {transCoin} &nbsp;Account</h4>
                  <h6>
                    {formatNum(0, { transCoin })}
                    &nbsp; {transCoin}
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
              {/* <div className="d-flex justify-content-between mt-4">
                <h5>
                  {coinObject.sym.length > 1 ? '' : coinObject.sym}
                  1.00&nbsp;
                  {coinObject.symbol}
                </h5>
                <h5>
                  {formatNum(1, { transCoin })}
                  &nbsp; {transCoin}
                </h5>
              </div> */}
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
            {isDeposit ? 'Deposit' : 'Withdraw'}
          </div>
        </div>
      )}
    </>
  );
}

export default SetAmount;
