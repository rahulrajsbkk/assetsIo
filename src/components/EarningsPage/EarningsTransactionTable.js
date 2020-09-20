import React, { useContext, useState, useEffect, Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars';
import { FormatCurrency, YesterdayToday } from '../../utils/FunctionTools';
import { EarningsContext } from '../../context/EarningsContext';
import TransactionInspector from '../TransactionInspector/TransactionInspector';

function EarningsTransactionTable() {
  const {
    coinSelected,
    loading,
    dateSelected,
    earnTransactions,
    contractTransactions,
    liquidOrBond,
    showNativeValue,
  } = useContext(EarningsContext);

  let date = '';

  const [rate, setRate] = useState(1);

  useEffect(() => {
    setRate(
      (coinSelected && coinSelected.price && coinSelected.price.USD) || 1
    );
  }, [coinSelected]);

  const checkIsExpandValue = (num, coin) => {
    if (coin === 'BTC' || coin === 'ETH') {
      if (num && num < 0.0001) return true;
      else return false;
    } else {
      if (num && num < 0.01) return true;
      else return false;
    }
  };

  const [tiObject, setTiObject] = useState(false);

  return (
    <>
      <Scrollbars
        autoHide
        className="vaults-list"
        renderThumbHorizontal={() => <div />}
        renderView={(props) => <div {...props} className="vaultsView" />}
      >
        {loading ? (
          <>
            <Skeleton height={40} width={250} />
            <Skeleton height={50} count={4} />
            <Skeleton height={40} width={250} />
            <Skeleton height={50} count={4} />
            <Skeleton height={40} width={250} />
            <Skeleton height={50} count={4} />
          </>
        ) : (
          coinSelected &&
          (liquidOrBond === 'Liquid' ? earnTransactions : contractTransactions)
            .filter(
              (txn) =>
                txn.coin === coinSelected.coinSymbol &&
                // (txn.deposit !== credit || txn.deposit === debit) &&
                (dateSelected
                  ? moment(txn.timestamp).format('MMDDYYYY') ===
                    moment(dateSelected.timestamp).format('MMDDYYYY')
                  : true)
            )
            .map((txn) => {
              function sameDay() {
                if (moment(txn.timestamp).format('MMDDYYYY') === date) {
                } else {
                  date = moment(txn.timestamp).format('MMDDYYYY');
                  return (
                    <div className="day">{YesterdayToday(txn.timestamp)}</div>
                  );
                }
              }
              return (
                <Fragment key={txn._id}>
                  {sameDay()}
                  <div className="vaults-itm">
                    <img src={coinSelected && coinSelected.coinImage} alt="" />
                    <div className="name-n-date mr-auto">
                      <div className="name">{txn.pid || txn.reason}</div>
                      <div className="date">
                        {moment(txn.timestamp).format(
                          'MMMM Do YYYY [at] h:mm:ss A zz'
                        )}
                      </div>
                    </div>
                    <div
                      className={`credit ${checkIsExpandValue(
                        (txn.deposit &&
                          txn.earned_interest * (showNativeValue ? 1 : rate)) ||
                          0,
                        showNativeValue ? txn.coin : 'USD'
                      )}`}
                    >
                      <span
                        className="expand"
                        onClick={() => {
                          setTiObject({
                            timestamp: txn.timestamp,
                            title: `${
                              txn.deposit
                                ? 'Credit From Instest Payment'
                                : 'Withdraw From Instest Payment'
                            }`,
                            amount: txn.earned_interest,
                            coin: txn.coin,
                            current: txn.usd_value,
                            updated: txn.earned_interest * rate,
                          });
                        }}
                      >
                        Expand
                      </span>
                      <span className="value">
                        {FormatCurrency(
                          txn.deposit &&
                            txn.earned_interest * (showNativeValue ? 1 : rate),
                          showNativeValue ? txn.coin : 'USD'
                        )}
                      </span>
                    </div>
                    <div
                      className={`debit ${checkIsExpandValue(
                        (txn.withdraw &&
                          txn.usd_value / (showNativeValue ? rate : 1)) ||
                          0,
                        showNativeValue ? txn.coin : 'USD'
                      )}`}
                    >
                      <span
                        className="expand"
                        onClick={() => {
                          setTiObject({
                            timestamp: txn.timestamp,
                            title: `${
                              txn.deposit
                                ? 'Credit From Instest Payment'
                                : 'Withdraw From Instest Payment'
                            }`,
                            amount: txn.usd_value / rate,
                            coin: txn.coin,
                            current: txn.usd_value,
                          });
                        }}
                      >
                        Expand
                      </span>
                      <span className="value">
                        {FormatCurrency(
                          (txn.withdraw &&
                            txn.usd_value / (showNativeValue ? rate : 1)) ||
                            0,
                          showNativeValue ? txn.coin : 'USD'
                        )}
                      </span>
                    </div>
                    <div
                      className={`balance ${checkIsExpandValue(
                        txn.updated_interest * (showNativeValue ? 1 : rate),
                        showNativeValue ? txn.coin : 'USD'
                      )}`}
                    >
                      <span
                        className="expand"
                        onClick={() => {
                          setTiObject({
                            timestamp: txn.timestamp,
                            title: `${
                              txn.deposit
                                ? 'Credit From Instest Payment'
                                : 'Withdraw From Instest Payment'
                            }`,
                            amount: txn.updated_interest,
                            coin: txn.coin,
                            updated: txn.updated_interest * rate,
                          });
                        }}
                      >
                        Expand
                      </span>
                      <span className="value">
                        {FormatCurrency(
                          txn.updated_interest * (showNativeValue ? 1 : rate),
                          showNativeValue ? txn.coin : 'USD'
                        )}
                      </span>
                    </div>
                  </div>
                </Fragment>
              );
            })
        )}
      </Scrollbars>
      {tiObject ? (
        <TransactionInspector setOpenModal={setTiObject} tiObject={tiObject} />
      ) : (
        ''
      )}
    </>
  );
}

export default EarningsTransactionTable;
