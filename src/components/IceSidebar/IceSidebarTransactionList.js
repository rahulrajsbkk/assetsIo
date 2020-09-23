import React, { useContext, Fragment } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import moment from 'moment';
import { BankContext } from '../../context/Context';
import { YesterdayToday, FormatCurrency } from '../../utils/FunctionTools';
import Skeleton from 'react-loading-skeleton';

function IceSidebarTransactionList({ globalEarnings, loading }) {
  let date = '';
  const { coinListObject } = useContext(BankContext);
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
              <div className="transaction">
                <h6>
                  <img
                    src={
                      coinListObject &&
                      coinListObject[txn.coin] &&
                      coinListObject[txn.coin].coinImage
                    }
                    alt=""
                  />
                  {FormatCurrency(txn.earned_interest, txn.coin)}
                </h6>
                <h6>
                  <img
                    src="https://icedvault.com/static/media/allPlatforms.aab1e804.svg"
                    alt=""
                  />
                  Global
                </h6>
              </div>
            </Fragment>
          );
        })}
      </Scrollbars>
    </>
  );
}

export default IceSidebarTransactionList;
