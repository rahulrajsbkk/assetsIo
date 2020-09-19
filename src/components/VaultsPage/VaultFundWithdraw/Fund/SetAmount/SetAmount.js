/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable indent */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid/dist';
import Axios from 'axios';
import Lottie from 'react-lottie';
import * as animationData from '../../../../../static/animations/cpu-loading.json';
import { BankContext } from '../../../../../context/Context';
import { VaultContext } from '../../../../../context/VaultContext';
import logo from '../../../../../static/images/logo.svg';

function SetAmount({ coinObject, price, transCoin, isDeposit, setOpenModal }) {
  const {
    email,
    token,
    name,
    profileId,
    tostShowOn,
    coinListObject,
  } = useContext(BankContext);
  const { updateBalance, coinSelected } = useContext(VaultContext);
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
    const data = {
      email: email,
      token: token,
      amount: parseFloat(isDeposit ? depositAsset : selectedCoinAmount), // amount you need to be credited in SUbVAult:GXVAult
      from_coin: isDeposit ? transCoin : coinSelected.coinSymbol, // coin from GXVAULT:SUBVAULT
      to_coin: isDeposit ? coinSelected.coinSymbol : transCoin, // to COIN in SUBVAULT:GXVAULT
      identifier: uuidv4(), // unique Identifier
      app_code: 'ice',
      profile_id: profileId,
    };

    Axios.post(
      `https://comms.globalxchange.com/coin/vault/service/${
        isDeposit ? 'fund' : 'withdraw'
      }/gx`,
      data
    )
      .then((res) => {
        const { data } = res;
        setMessage(data);
        if (data.status) {
          tostShowOn('Transaction Succes');
          setOpenModal(false);
        } else {
          tostShowOn(data.message);
        }
      })
      .catch((err) => {
        setMessage({
          status: false,
          message: err.message ? err.err : 'Something Went Wrong',
        });
        tostShowOn(err.message ? err.err : 'Something Went Wrong');
      })
      .finally(() => {
        setLoading(false);
        updateBalance();
      });
  };
  const [selectedCoinAmount, setSelectedCoinAmount] = useState('');
  const selectedChange = (e) => {
    setSelectedCoinAmount(e.target.value);
    coinListObject &&
      coinListObject[coinSelected.coinSymbol] &&
      setDepositAsset(
        e.target.value === ''
          ? ''
          : (
              (coinObject.price * e.target.value) /
              coinListObject[coinSelected.coinSymbol].price.USD
            ).toFixed(4)
      );
  };
  const depositOnChange = (e) => {
    setDepositAsset(e.target.value);
    setSelectedCoinAmount(
      e.target.value === ''
        ? ''
        : (
            (e.target.value *
              coinListObject[coinSelected.coinSymbol].price.USD) /
            coinObject.price
          ).toFixed(4)
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
        <div className="d-flex flex-column flex-grow-1">
          <div className="m-auto">
            <Lottie options={defaultOptions} height={150} width={150} />
          </div>
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
                    &apos;s&nbsp;
                    {transCoin.toUpperCase()}
                    &nbsp;Vault
                  </h4>
                  <h6>
                    {formatNum(
                      price[transCoin.toUpperCase()].coinValue,
                      price[transCoin.toUpperCase()].symbol
                    )}
                    &nbsp;
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
                  <h4>Iced {coinSelected.coinSymbol} &nbsp;Account</h4>
                  <h6>
                    {formatNum(coinSelected.coinValue, coinSelected.coinSymbol)}
                    &nbsp; {coinSelected.coinSymbol}
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
              <span className="col-6 p-0">{coinSelected.coinSymbol} Value</span>
            </p>
            <div className="border-wrap p-0 d-flex">
              <input
                value={selectedCoinAmount}
                onChange={selectedChange}
                type="number"
                className="amount-input d-flex h-100 col-6"
                placeholder={
                  transCoin === 'BTC' || transCoin === 'ETH' ? '0.0000' : '0.00'
                }
              />
              <input
                value={depositAsset}
                onChange={depositOnChange}
                type="number"
                className="amount-input d-flex h-100 col-6 border-left"
                placeholder={
                  coinSelected.coinSymbol === 'BTC' ||
                  coinSelected.coinSymbol === 'ETH'
                    ? '0.0000'
                    : '0.00'
                }
              />
            </div>
          </div>
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
