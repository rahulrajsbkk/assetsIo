import React, { useContext, useEffect, useState } from 'react';
import option from '../../../Static/image/gx-options.svg';
import vault from '../../../Static/image/vault.svg';
import { OptionsContext } from '../../../ContextAPI/OptionContext';
import { v4 as uuidv4 } from 'uuid/dist';
import Axios from 'axios';
import Lottie from 'react-lottie';
import * as animationData from '../../../Static/animation/wallet-coin.json';

function SetAmount({ coinObject, setModalOpen, setCoinObject, price }) {
  const {
    usdAmountFormatter,
    balance,
    name,
    email,
    depositAsset,
    setdepositAsset,
    transCoin,
    username,
    token,
    refreshBalance,
    setTransCoin,
  } = useContext(OptionsContext);
  const [vaultBalance, setVaultBalance] = useState(0);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const amountFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 5,
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setdepositAsset('');
    Axios.get(
      `https://comms.globalxchange.com/coin/vault/user/balances/all?email=${email}`
    ).then((res) => {
      if (res.data.status) {
        setVaultBalance(res.data.total_sum);
      }
    });
  }, []);

  const [message, setMessage] = useState('');
  const depositWithdraw = () => {
    Axios.post(
      'https://gxtokenoptions.azurewebsites.net/api/Trade/DepositWithdraw',
      {
        RequestType: 'Withdraw',
        DepositAsset: 0,
        WithdrawalAsset: depositAsset,
        GxId: uuidv4(),
        Email: email,
        UserId: username,
        Asset: transCoin,
        Token: token,
      }
    )
      .then((res) => {
        setMessage(res.data);
        setTimeout(refreshBalance, 2000);
        if (res.data.status) {
          Axios.post(
            'https://gxtokenoptions.azurewebsites.net/api/Trade/ConvertCryptoUSD',
            {
              Token: token,
              email: email,
              affiliate_id: '',
              coin_purchased: transCoin,
              purchased_from: 'USD',
              from_amount: depositAsset,
            }
          ).then((res) => {
            console.log('convert :', res.data);
          });
        }
      })
      .catch((err) => {
        console.log('err :', err);
        setMessage({ status: false, message: 'Something Went Wrong' });
      });
  };

  const [selectedCoinAmount, setSelectedCoinAmount] = useState('');

  const selectedChange = (e) => {
    setSelectedCoinAmount(e.target.value);
    setdepositAsset(
      e.target.value === '' ? '' : coinObject.price * e.target.value
    );
  };
  const depositOnChange = (e) => {
    setdepositAsset(e.target.value);
    setSelectedCoinAmount(
      e.target.value === '' ? '' : e.target.value / coinObject.price
    );
  };
  useEffect(() => {
    if (message !== '') {
      setTimeout(() => {
        setModalOpen(false);
        setLoading(false);
      }, 2000);
    }
  }, [message]);

  const [isCoinSelect, setIsCoinSelect] = useState(false);

  return (
    <>
      {loading ? (
        <div className="d-flex flex-column" style={{ height: 500 }}>
          {loading && message === '' ? (
            <Lottie options={defaultOptions} height={500} width={300} />
          ) : (
            <>
              {message.status ? (
                <>
                  <h3 className="text-white text-center mx-4 mt-auto">
                    Congratulations
                  </h3>
                  <h4 className="text-white text-center mx-4 mb-auto">
                    ${depositAsset} Has Been Deposited Into Your {transCoin}{' '}
                    Vault Account
                  </h4>
                </>
              ) : (
                <h4 className="text-white text-center mx-4 my-auto">
                  {message.message}
                </h4>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="set-amount">
          <div className="group m-4">
            <p className="mb-2">From</p>
            <div className="border-wrap d-flex">
              <div className="d-flex">
                <img src={option} alt="" className="icon" />
                <div className="flex-grow-1 my-auto">
                  <h4>Options Account</h4>
                  <h6>${usdAmountFormatter.format(balance)}</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="group m-4">
            <p className="mb-2">To</p>
            <div className="border-wrap d-flex flex-column select-sym">
              <div className="d-flex drop-togle">
                <img src={vault} alt="" className="icon" />
                <div className="flex-grow-1 my-auto">
                  <h4>
                    <span>{name}</span>'s Vault
                  </h4>
                  <h6>${usdAmountFormatter.format(vaultBalance)}</h6>
                </div>
                <h4
                  className={
                    isCoinSelect
                      ? 'fas fa-caret-up mx-2 my-auto'
                      : 'fas fa-caret-down mx-2 my-auto'
                  }
                  onClick={() => setIsCoinSelect(!isCoinSelect)}
                />
              </div>
              {isCoinSelect ? (
                <div className="d-flex drop-items">
                  <div
                    className="d-flex flex-column"
                    onClick={() => {
                      setTransCoin('BTC');
                      setCoinObject(price['BTC']);
                      setIsCoinSelect(false);
                    }}
                  >
                    <i className="tokenicon-btc" />
                    <h6>BTC</h6>
                  </div>
                  <div
                    className="d-flex flex-column"
                    onClick={() => {
                      setTransCoin('ETH');
                      setCoinObject(price['ETH']);
                      setIsCoinSelect(false);
                    }}
                  >
                    <i className="tokenicon-eth" />
                    <h6>ETH</h6>
                  </div>
                  <div
                    className="d-flex flex-column"
                    onClick={() => {
                      setTransCoin('USDT');
                      setCoinObject(price['USDT']);
                      setIsCoinSelect(false);
                    }}
                  >
                    <i className="tokenicon-usdt" />
                    <h6>USDT</h6>
                  </div>
                  <div
                    className="d-flex flex-column"
                    onClick={() => {
                      setTransCoin('USD');
                      setCoinObject(price['USD']);
                      setIsCoinSelect(false);
                    }}
                  >
                    <i className="tokenicon-usd" />
                    <h6>USD</h6>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="group m-4">
            <p className="mb-2 d-flex">
              <span className="col-6 p-0">{transCoin} Vault Debit</span>
              <span className="col-6 p-0">Options Account (USD)</span>
            </p>
            <div className="border-wrap p-0 d-flex">
              <input
                value={selectedCoinAmount}
                onChange={selectedChange}
                type="number"
                className="amount-input d-flex h-100 col-6"
                placeholder={`${coinObject.sym}00.00`}
              />
              <input
                value={depositAsset}
                onChange={depositOnChange}
                type="number"
                className="amount-input d-flex h-100 col-6 border-left"
                placeholder="$00.00"
              />
            </div>
          </div>
          {transCoin !== 'USD' ? (
            <div className="m-4 coin-detail">
              <div className="d-flex justify-content-between mt-4">
                <h5>Available To Deposit</h5>
                <h5>0.00000</h5>
              </div>
              <div className="d-flex justify-content-between">
                <h6>Funds On Hold</h6>
                <h6>0.00000</h6>
              </div>
              <div className="d-flex justify-content-between mt-4">
                <h5>
                  {coinObject.sym.length > 1 ? '' : coinObject.sym}1.00{' '}
                  {coinObject.symbol}
                </h5>
                <h5>${amountFormatter.format(coinObject.price)} USD</h5>
              </div>
              <div className="d-flex justify-content-between my-4">
                <h5>Proccesing Time</h5>
                <h5>Instant</h5>
              </div>
            </div>
          ) : (
            ''
          )}
          {isCoinSelect ? (
            <div className="deposit-footer">Change "To" Vault</div>
          ) : (
            <div
              className="deposit-footer"
              onClick={() => {
                depositWithdraw();
                setLoading(true);
              }}
            >
              Withdraw
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default SetAmount;
