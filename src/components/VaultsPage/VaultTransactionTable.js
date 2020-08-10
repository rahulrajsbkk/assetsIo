import React, { useContext } from 'react';
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars';
import { VaultContext } from '../../context/VaultContext';
import { FormatCurrency, YesterdayToday } from '../../utils/FunctionTools';

function VaultTransactionTable({ credit, debit }) {
  const { vaultTxns, coinSelected } = useContext(VaultContext);
  let date = '';
  return (
    <Scrollbars
      autoHide
      className="vaults-list"
      renderView={(props) => <div {...props} className="vaultsView" />}
    >
      {coinSelected &&
        vaultTxns
          .filter(
            (txn) =>
              txn.cus_native_code === coinSelected.coinSymbol &&
              (txn.deposit !== credit || txn.deposit === debit)
          )
          .map((txn) => {
            console.log('txn :>> ', txn);
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
                  <img src="" alt="" />
                  <div className="name-n-date mr-auto">
                    <div className="name">{txn.pid}</div>
                    <div className="date">
                      {moment().format('MMMM Do YYYY [at] h:mm:ss A zz')}
                    </div>
                  </div>
                  <div className="credit">
                    {FormatCurrency(
                      txn.deposit && txn.native_value,
                      txn.cus_native_code
                    )}
                  </div>
                  <div className="debit">
                    {FormatCurrency(
                      !txn.deposit && txn.native_value,
                      txn.cus_native_code
                    )}
                  </div>
                  <div className="balance">
                    {FormatCurrency(txn.updated_balance, txn.cus_native_code)}
                  </div>
                </div>
              </>
            );
          })}
    </Scrollbars>
  );
}

export default VaultTransactionTable;
