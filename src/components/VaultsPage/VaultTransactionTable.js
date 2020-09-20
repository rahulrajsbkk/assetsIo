import React, { useContext, useState, Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars';
import { VaultContext } from '../../context/VaultContext';
import { FormatCurrency, YesterdayToday } from '../../utils/FunctionTools';
import { BankContext } from '../../context/Context';
import TransactionInspector from '../TransactionInspector/TransactionInspector';

function VaultTransactionTable({ credit, debit }) {
  const {
    vaultTxns,
    coinSelected,
    loading,
    menuTwo,
    dateSelected,
  } = useContext(VaultContext);
  const { coinListObject } = useContext(BankContext);

  let date = '';

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
          vaultTxns
            .filter(
              (txn) =>
                txn.coin === coinSelected.coinSymbol &&
                (menuTwo.key === 'all'
                  ? true
                  : menuTwo.key === 'credit'
                  ? txn.deposit
                  : !txn.deposit) &&
                (txn.deposit !== credit || txn.deposit === debit) &&
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

              console.log('txn', txn);
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
                        (txn.deposit && txn.amount) || 0,
                        txn.coin
                      )}`}
                    >
                      <span
                        className="expand"
                        onClick={() => {
                          const rate =
                            (coinSelected &&
                              txn.coin &&
                              coinSelected.price.USD) ||
                            1;
                          setTiObject({
                            timestamp: txn.timestamp,
                            title: `${txn.pid || txn.reason}`,
                            amount: txn.amount,
                            coin: txn.coin,
                            current: txn.usd_value,
                            updated: txn.amount * rate,
                          });
                        }}
                      >
                        Expand
                      </span>
                      <span className="value">
                        {FormatCurrency(txn.deposit && txn.amount, txn.coin)}
                      </span>
                    </div>
                    <div
                      className={`debit ${checkIsExpandValue(
                        (txn.withdraw && txn.amount) || 0,
                        txn.coin
                      )}`}
                    >
                      <span
                        className="expand"
                        onClick={() => {
                          const rate =
                            (coinSelected &&
                              txn.coin &&
                              coinSelected.price.USD) ||
                            1;
                          setTiObject({
                            timestamp: txn.timestamp,
                            title: `${txn.pid || txn.reason}`,
                            amount: txn.amount,
                            coin: txn.coin,
                            current: txn.usd_value,
                            updated: txn.amount * rate,
                          });
                        }}
                      >
                        Expand
                      </span>
                      <span className="value">
                        {FormatCurrency(txn.withdraw && txn.amount, txn.coin)}
                      </span>
                    </div>
                    <div
                      className={`balance ${checkIsExpandValue(
                        txn.updated_balance,
                        txn.coin
                      )}`}
                    >
                      <span
                        className="expand"
                        onClick={() => {
                          const rate =
                            (coinSelected &&
                              txn.coin &&
                              coinSelected.price.USD) ||
                            1;
                          setTiObject({
                            timestamp: txn.timestamp,
                            title: `${txn.pid || txn.reason}`,
                            amount: txn.updated_balance,
                            coin: txn.coin,
                            current: txn.updated_balance * rate,
                            updated: txn.updated_balance * rate,
                          });
                        }}
                      >
                        Expand
                      </span>
                      <span className="value">
                        {FormatCurrency(txn.updated_balance, txn.coin)}
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

export default VaultTransactionTable;
