import React, { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars';
import { FormatCurrency, YesterdayToday } from '../../utils/FunctionTools';
import { EarningsContext } from '../../context/EarningsContext';

function EarningsTransactionTable({ credit, debit }) {
  const { coinSelected, loading, dateSelected, earnTransactions } = useContext(
    EarningsContext
  );
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
        earnTransactions
          .filter(
            (txn) =>
              txn.coin === coinSelected.coinSymbol &&
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
                      {moment().format('MMMM Do YYYY [at] h:mm:ss A zz')}
                    </div>
                  </div>
                  <div className="credit">
                    {FormatCurrency(
                      txn.deposit && txn.earned_interest,
                      txn.coin
                    )}
                  </div>
                  <div className="debit">
                    {FormatCurrency(
                      txn.withdraw && txn.earned_interest,
                      txn.coin
                    )}
                  </div>
                  <div className="balance">
                    {FormatCurrency(txn.updated_interest, txn.coin)}
                  </div>
                </div>
              </>
            );
          })
      )}
    </Scrollbars>
  );
}

export default EarningsTransactionTable;
