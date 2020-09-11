import React, { useContext, Fragment } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import moment from 'moment';
import { BankContext } from '../../context/Context';
import { YesterdayToday, FormatCurrency } from '../../utils/FunctionTools';

function IceSidebarTransactionList({ globalEarnings }) {
  let date = '';
  const { coinListObject } = useContext(BankContext);
  return (
    <Scrollbars
      autoHide
      className="iceEarningList"
      renderThumbHorizontal={() => <div />}
      renderView={(props) => <div {...props} className="earningList" />}
    >
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
      <div className="day">Today</div>
    </Scrollbars>
  );
}

export default IceSidebarTransactionList;
