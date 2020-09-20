import React from 'react';
import moment from 'moment';

import logo from '../../static/images/assetsLogo.svg';

function TransactionInspector({ setOpenModal, tiObject }) {
  return (
    <div className="transactionInspectorWrapper">
      <div
        className="overlay-ti"
        role="button"
        tabIndex="-1"
        onClick={() => setOpenModal(false)}
      />
      <div className="ti-content">
        <div className="ti-head">
          <img src={logo} alt="" /> Transaction Inspector
        </div>
        <div className="ti-detail">
          <div className="ti-row">
            <div className="label">
              {moment(tiObject.timestamp).format('h:mm A zz [on] MMMM Do YYYY')}
            </div>
            <div className="value">{tiObject.title}</div>
          </div>
          <div className="ti-row">
            <div className="label">Amount</div>
            <div className="value">
              {tiObject.amount} {tiObject.coin}
            </div>
          </div>
          <div className="ti-row horiz">
            <div className="flex-50">
              <div className="label">Value In USD Then</div>
              <div className="value">${tiObject.current} USD</div>
            </div>
            <div className="flex-50">
              <div className="label">Value In USD Now</div>
              <div className="value">${tiObject.updated} USD</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionInspector;
