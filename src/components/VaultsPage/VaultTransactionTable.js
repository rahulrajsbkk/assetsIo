import React, { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars';
import { VaultContext } from '../../context/VaultContext';
import { FormatCurrency, YesterdayToday } from '../../utils/FunctionTools';

function VaultTransactionTable({ credit, debit }) {
  const {
    vaultTxns,
    coinSelected,
    loading,
    menuTwo,
    dateSelected,
  } = useContext(VaultContext);
  let date = '';
  return (
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
            return (
              <>
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
                  <div className="credit">
                    {FormatCurrency(txn.deposit && txn.amount, txn.coin)}
                  </div>
                  <div className="debit">
                    {FormatCurrency(txn.withdraw && txn.amount, txn.coin)}
                  </div>
                  <div className="balance">
                    {FormatCurrency(txn.updated_balance, txn.coin)}
                  </div>
                </div>
              </>
            );
          })
      )}
    </Scrollbars>
  );
}

export default VaultTransactionTable;
