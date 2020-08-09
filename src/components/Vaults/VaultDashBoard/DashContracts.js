import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import DashContractsChart from './DashContractsChart';
import btcIcon from '../../../static/images/usd-btc/btc.svg';
import usdIcon from '../../../static/images/usd-btc/usd.svg';

function DashContracts() {
  const [selectedDetail, setSelectedDetail] = useState('');
  const [valueShow, setValueShow] = useState('btc');
  return (
    <div className="dashContracts">
      <div className="chartSection">
        <div className="annualRate">24.0%</div>
        <div className="annualRatelabel">Annual Interest Rate</div>
        <DashContractsChart />
      </div>
      <div className="detailings">
        <div
          className={`headMain ${
            selectedDetail === '' || selectedDetail.includes('deposit')
          }`}
        >
          Deposit Details
        </div>
        <div
          className={`detailItem ${
            selectedDetail === '' || selectedDetail === 'deposit'
          }`}
          onClick={() => setSelectedDetail('deposit')}
        >
          <div className="name">Deposit:</div>
          <div className="valueNbtn">
            <div className="value">$40,000.00</div>
            <div className="btnView">
              BTC <FontAwesomeIcon icon={faEye} />
            </div>
          </div>
        </div>
        <div
          className={`detailItem ${
            selectedDetail === '' || selectedDetail === ''
          }`}
        >
          <div className="name">Deposit Date:</div>
          <div className="date">March 21st 2020</div>
        </div>
        <div
          className={`headMain ${
            selectedDetail === '' || selectedDetail.includes('redeem')
          }`}
        >
          Redemption Details
        </div>
        <div
          className={`detailItem ${
            selectedDetail === '' || selectedDetail === 'redeem'
          }`}
          onClick={() => setSelectedDetail('redeem')}
        >
          <div className="name">Redemption:</div>
          <div className="valueNbtn">
            <div className="value">$40,000.00</div>
            <div className="btnView">
              BTC <FontAwesomeIcon icon={faEye} />
            </div>
          </div>
        </div>
        <div
          className={`detailItem ${
            selectedDetail === '' || selectedDetail === ''
          }`}
        >
          <div className="name">Redemption Date:</div>
          <div className="date">March 21st 2020</div>
        </div>
        <div
          className={`headMain ${
            selectedDetail === '' || selectedDetail.includes('term')
          }`}
        >
          Term Details
        </div>
        <div
          className={`detailItem ${
            selectedDetail === '' || selectedDetail === 'term-annualised'
          }`}
          onClick={() => setSelectedDetail('term-annualised')}
        >
          <div className="name">Annualized Rate:</div>
          <div className="valueNbtn">
            <div className="value">24.00%</div>
            <div className="btnView">
              BTC <FontAwesomeIcon icon={faEye} />
            </div>
          </div>
        </div>
        <div
          className={`detailItem ${
            selectedDetail === '' || selectedDetail === 'term-rate'
          }`}
          onClick={() => setSelectedDetail('term-rate')}
        >
          <div className="name">Term Rate (3M):</div>
          <div className="valueNbtn">
            <div className="value">8.00%</div>
            <div className="btnView">
              BTC <FontAwesomeIcon icon={faEye} />
            </div>
          </div>
        </div>
        <div
          className={`detailItem ${
            selectedDetail === '' || selectedDetail === 'term-profit'
          }`}
          onClick={() => setSelectedDetail('term-profit')}
        >
          <div className="name">Fees From Profit:</div>
          <div className="valueNbtn">
            <div className="value down">$513.93</div>
            <div className="btnView">
              BTC <FontAwesomeIcon icon={faEye} />
            </div>
          </div>
        </div>
        <div
          className={`detailItem ${
            selectedDetail === '' || selectedDetail === 'term-earnings'
          }`}
          onClick={() => setSelectedDetail('term-earnings')}
        >
          <div className="name">Net Earnings:</div>
          <div className="valueNbtn">
            <div className="value up">$2,134.34</div>
            <div className="btnView">
              BTC <FontAwesomeIcon icon={faEye} />
            </div>
          </div>
        </div>
        <div
          className={`detailItem ${
            selectedDetail === '' || selectedDetail === 'term-daily'
          }`}
          onClick={() => setSelectedDetail('term-daily')}
        >
          <div className="name">90 Daily Payments:</div>
          <div className="valueNbtn">
            <div className="value up">$24,46</div>
            <div className="btnView">
              BTC <FontAwesomeIcon icon={faEye} />
            </div>
          </div>
        </div>
        {selectedDetail ? (
          <div className="moreDetail">
            <div
              className={`btnBtcUsd ${valueShow === 'btc'}`}
              onClick={() => setValueShow('btc')}
            >
              <img src={btcIcon} alt="" />
            </div>
            <div
              className={`btnBtcUsd ${valueShow === 'usd'}`}
              onClick={() => setValueShow('usd')}
            >
              <img src={usdIcon} alt="" />
            </div>
            <h4 className="value">
              {valueShow === 'btc'
                ? 0.0034567
                : `$${(0.0034567 * 11644).toFixed(2)}`}
            </h4>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default DashContracts;
