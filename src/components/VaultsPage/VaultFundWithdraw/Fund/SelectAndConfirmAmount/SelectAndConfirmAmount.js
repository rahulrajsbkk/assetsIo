import React, { useContext, useEffect, useState } from 'react';
import { FormatCurrency } from '../../../../../utils/FunctionTools';
import { v4 as uuidv4 } from 'uuid/dist';
import jwt from 'jsonwebtoken';
import Axios from 'axios';
import Lottie from 'react-lottie';
import * as animationData from '../../../../../static/animations/cpu-loading.json';
import { BankContext } from '../../../../../context/Context';
import { VaultContext } from '../../../../../context/VaultContext';

const key = 'HUBQTVce7cUde4F';

function SelectAndConfirmAmount({
  coinObject,
  transCoin,
  isDeposit,
  setOpenModal,
  appFrom,
}) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
  };

  const {
    email,
    token,
    profileId,
    tostShowOn,
    coinListObject,
    validateToken,
  } = useContext(BankContext);
  const { updateBalance, coinSelected } = useContext(VaultContext);
  const [depositAsset, setDepositAsset] = useState('');

  const [loading, setLoading] = useState(false);
  const [messageobj, setMessage] = useState('');
  const depositWithdraw = async () => {
    const isValidTkn = await validateToken(email, token);
    if (appFrom.app_code === 'gx') {
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
      isValidTkn &&
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
    } else {
      const data = isDeposit
        ? {
            token: token,
            email: email,
            from: {
              app_code: appFrom.app_code,
              profile_id: appFrom.profile_id,
              coin: transCoin,
            },
            to: {
              app_code: 'ice',
              profile_id: profileId,
              coin: coinSelected.coinSymbol,
            },
            to_amount: depositAsset, // the amount to be received in to COIN, here in the example, 100=>100 INR, as it is the to COIN
            identifier: uuidv4(), // unique txn identifier
            transfer_for: `Deposit To Ice From ${appFrom.app_name}`, // where or why this transfer is for
          }
        : {
            token: token,
            email: email,
            from: {
              app_code: 'ice',
              profile_id: profileId,
              coin: coinSelected.coinSymbol,
            },
            to: {
              app_code: appFrom.app_code,
              profile_id: appFrom.profile_id,
              coin: transCoin,
            },
            to_amount: selectedCoinAmount, // the amount to be received in to COIN, here in the example, 100=>100 INR, as it is the to COIN
            identifier: uuidv4(), // unique txn identifier
            transfer_for: `Deposit To ${appFrom.app_name} From Ice`, // where or why this transfer is for
          };
      let encoded = jwt.sign(data, key, { algorithm: 'HS512' });
      Axios.post(
        'https://comms.globalxchange.com/coin/vault/service/transfer',
        { data: encoded }
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
    }
  };
  const [selectedCoinAmount, setSelectedCoinAmount] = useState('');
  const selectedChange = (e) => {
    if (!isNaN(e.target.value)) {
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
    }
  };
  const depositOnChange = (e) => {
    if (!isNaN(e.target.value)) {
      setDepositAsset(e.target.value);
      setSelectedCoinAmount(
        e.target.value === ''
          ? ''
          : parseFloat(
              FormatCurrency(
                (e.target.value *
                  coinListObject[coinSelected.coinSymbol].price.USD) /
                  coinObject.price,
                transCoin
              ).replace(',', '')
            )
      );
    }
  };
  useEffect(() => {
    if (messageobj !== '') {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [messageobj]);

  const [readOnly, setReadOnly] = useState(false);

  return (
    <div className="select-vault coin">
      <div className="head">Confirm Deposit Details</div>
      {loading ? (
        <div className="content">
          <div className="m-auto">
            <Lottie options={defaultOptions} height={150} width={150} />
          </div>
        </div>
      ) : (
        <div className="content detail">
          <div className="label">
            Your {appFrom.app_name} {transCoin} Vault Will Be{' '}
            {!isDeposit ? 'Credited' : 'Debited'}
          </div>
          <label className="asset-item " tabIndex={0} role="button">
            <img
              src={coinListObject && coinListObject[transCoin].coinImage}
              className="icon my-auto"
              alt=""
            />
            <div className="name">
              {coinListObject && coinListObject[transCoin].coinName}
            </div>
            <div className="amount">
              <input
                value={selectedCoinAmount}
                onChange={selectedChange}
                type="text"
                placeholder={FormatCurrency(0, transCoin)}
                readOnly={readOnly}
              />
              <small>{transCoin}</small>
            </div>
          </label>
          <div className="label">
            Your Assets.io {coinSelected && coinSelected.coinSymbol} Vault Will
            Be {isDeposit ? 'Credited' : 'Debited'}
          </div>
          <label className="asset-item " tabIndex={0} role="button">
            <img
              src={
                coinListObject &&
                coinSelected &&
                coinListObject[coinSelected.coinSymbol].coinImage
              }
              className="icon my-auto"
              alt=""
            />
            <div className="name">
              {coinListObject &&
                coinSelected &&
                coinListObject[coinSelected.coinSymbol].coinName}
            </div>
            <div className="amount">
              <input
                value={depositAsset}
                onChange={depositOnChange}
                type="text"
                placeholder={FormatCurrency(
                  0,
                  coinSelected && coinSelected.coinSymbol
                )}
                readOnly={readOnly}
              />
              <small>{coinSelected && coinSelected.coinSymbol}</small>
            </div>
          </label>
          <div className="buttons">
            <div className="deposit inv" onClick={() => setReadOnly(!readOnly)}>
              {readOnly ? 'Edit' : 'Done'}
            </div>
            <div
              className="deposit"
              onClick={() => {
                depositWithdraw();
                setLoading(true);
              }}
            >
              Confirm
            </div>
          </div>
        </div>
      )}
      <div className="footer" onClick={() => {}}>
        <span className="label">Transfer Fees </span>
        <span className="value">
          ${FormatCurrency(0, 'USD')}
          <small>USD</small>
        </span>
      </div>
    </div>
  );
}

export default SelectAndConfirmAmount;
