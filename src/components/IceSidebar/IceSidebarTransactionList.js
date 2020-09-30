import React, { useContext, Fragment, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import moment from 'moment';
import { BankContext } from '../../context/Context';
import { YesterdayToday, FormatCurrency } from '../../utils/FunctionTools';
import Skeleton from 'react-loading-skeleton';
import TransactionInspector from '../TransactionInspector/TransactionInspector';

function IceSidebarTransactionList({ globalEarnings, loading }) {
  let date = '';
  const { coinListObject } = useContext(BankContext);
  const [tiObject, setTiObject] = useState(false);

  const checkIsExpandValue = (num, coin) => {
    if (coin === 'BTC' || coin === 'ETH') {
      if (num < 0.0001) return true;
      else return false;
    } else {
      if (num < 0.01) return true;
      else return false;
    }
  };

  return (
    <>
      <Scrollbars
        autoHide
        className="iceEarningList"
        renderThumbHorizontal={() => <div />}
        renderView={(props) => <div {...props} className="earningList" />}
      >
        {loading ? (
          <div
            style={{
              flex: 1,
              padding: '0 50px',
            }}
          >
            <Skeleton height={40} count={6} />
          </div>
        ) : (
          ''
        )}
        {globalEarnings.map((txn) => {
          function sameDay() {
            if (moment(txn.timestamp).format('MMDDYYYY') === date) {
            } else {
              date = moment(txn.timestamp).format('MMDDYYYY');
              return (
                <div className="day">
                  {YesterdayToday(txn.timestamp, 'dddd MMMM Do YYYY')}
                </div>
              );
            }
          }
          return (
            <Fragment key={txn._id}>
              {sameDay()}
              <div
                className={`transaction ${checkIsExpandValue(
                  txn.earned_interest,
                  txn.coin
                )}`}
              >
                <h6>
                  <img
                    src={
                      coinListObject &&
                      coinListObject[txn.coin] &&
                      coinListObject[txn.coin].coinImage
                    }
                    alt=""
                  />
                  <span className="value">
                    {FormatCurrency(txn.earned_interest, txn.coin)}
                  </span>
                  <span
                    className="expand"
                    onClick={() => {
                      setTiObject({
                        timestamp: txn.timestamp,
                        title: 'Credit From Interest Payment',
                        amount: txn.earned_interest,
                        coin: txn.coin,
                        current: txn.earned_usd_value,
                        updated: '',
                      });
                    }}
                  >
                    Expand
                  </span>
                </h6>
                <h6>
                  <img className="flag" src={txn.countryData.image} alt="" />
                  {txn.countryData.code}
                </h6>
              </div>
            </Fragment>
          );
        })}
      </Scrollbars>
      {tiObject ? (
        <TransactionInspector setOpenModal={setTiObject} tiObject={tiObject} />
      ) : (
        ''
      )}
    </>
  );
}

export default IceSidebarTransactionList;
