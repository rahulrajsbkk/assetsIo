/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable indent */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useState } from 'react';
import Axios from 'axios';
import Lottie from 'react-lottie';
import * as animationData from '../../../../../static/animations/cpu-loading.json';
import logo from '../../../../../static/images/logo.svg';
import { BankContext } from '../../../../../context/Context';
import { EarningsContext } from '../../../../../context/EarningsContext';
import { FormatCurrency } from '../../../../../utils/FunctionTools';

function SetAmount({ setOpenModal }) {
  const { coinListObject, email, token, profileId, tostShowOn } = useContext(
    BankContext
  );
  const {
    coinSelected,
    liquidEarningBalances,
    liquidOrBond,
    contractEarnings,
    appSelected,
  } = useContext(EarningsContext);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const [amount, setAmount] = useState('');
  const [usdAmount, setUsdAmount] = useState('');
  const amountChange = (e) => {
    if (
      coinSelected &&
      coinSelected.coinSymbol &&
      coinListObject[coinSelected.coinSymbol] &&
      coinListObject[coinSelected.coinSymbol].price
    ) {
      setAmount(e.target.value);
      setUsdAmount(
        e.target.value === ''
          ? ''
          : (
              coinListObject[coinSelected.coinSymbol].price.USD * e.target.value
            ).toFixed(2)
      );
    }
  };
  const usdAmountChange = (e) => {
    if (
      coinSelected &&
      coinSelected.coinSymbol &&
      coinListObject[coinSelected.coinSymbol] &&
      coinListObject[coinSelected.coinSymbol].price
    ) {
      setUsdAmount(e.target.value);
      setAmount(
        e.target.value === ''
          ? ''
          : Math.round(
              (e.target.value /
                coinListObject[coinSelected.coinSymbol].price.USD +
                Number.EPSILON) *
                100000
            ) / (100000).toPrecision(5)
      );
    }
  };

  const [loading, setLoading] = useState(false);

  const withdraw = () => {
    if (
      coinSelected &&
      coinSelected.coinSymbol &&
      appSelected &&
      appSelected.app_code
    )
      if (liquidOrBond === 'Liquid') {
        setLoading(true);
        Axios.post(
          'https://comms.globalxchange.com/coin/vault/service/user/app/interest/withdraw',
          {
            email,
            token,
            app_code: appSelected.app_code,
            profile_id: appSelected.profile_id,
            coin: coinSelected.coinSymbol,
            amount: amount,
          }
        )
          .then((res) => {
            const { data } = res;
            if (data.status) {
              setOpenModal(false);
            }
            tostShowOn(data.message);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(true);
        Axios.post(
          'https://comms.globalxchange.com/coin/iced/interest/withdraw',
          {
            email,
            token,
            app_code: 'ice',
            profile_id: profileId,
            coin: coinSelected.coinSymbol,
            amount: amount,
          }
        )
          .then((res) => {
            const { data } = res;
            if (data.status) {
              setOpenModal(false);
            }
            tostShowOn(data.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }
  };

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
                <img src={logo} alt="" className="icon" />
                <div className="flex-grow-1 my-auto">
                  <h4>
                    {coinSelected && coinSelected.coinSymbol} Earnings
                    &nbsp;Vault
                  </h4>
                  <h6>
                    {liquidOrBond === 'Liquid'
                      ? coinSelected &&
                        contractEarnings &&
                        FormatCurrency(
                          liquidEarningBalances[coinSelected.coinSymbol],
                          coinSelected.coinSymbol
                        )
                      : coinSelected &&
                        contractEarnings &&
                        FormatCurrency(
                          contractEarnings[coinSelected.coinSymbol],
                          coinSelected.coinSymbol
                        )}
                    &nbsp;
                    {coinSelected && coinSelected.coinSymbol}
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
                  <h4>
                    {liquidOrBond === 'Liquid' &&
                      appSelected &&
                      appSelected.app_code}{' '}
                    {coinSelected && coinSelected.coinSymbol} &nbsp;Account
                  </h4>
                  {/* <h6>
                    {FormatCurrency(0, 'USD')}
                    &nbsp; {'USD'}
                  </h6> */}
                </div>
              </div>
            </div>
          </div>
          <div className="group m-4">
            <p className="mb-2 d-flex">
              <span className="col-6 p-0">
                {coinSelected && coinSelected.coinSymbol}
                &nbsp;Vault Debit
              </span>
              <span className="col-6 p-0">USD Value</span>
            </p>
            <div className="border-wrap p-0 d-flex">
              <input
                value={amount}
                onChange={amountChange}
                type="number"
                className="amount-input d-flex h-100 col-6"
                placeholder="0.0000"
              />
              <input
                value={usdAmount}
                onChange={usdAmountChange}
                type="number"
                className="amount-input d-flex h-100 col-6 border-left"
                placeholder="$0.00"
              />
            </div>
          </div>
          <div
            role="button"
            tabIndex={0}
            className="deposit-footer"
            onClick={() => {
              withdraw();
              // depositWithdraw();
              // setLoading(true);
            }}
          >
            Withdraw
          </div>
        </div>
      )}
    </>
  );
}

export default SetAmount;
