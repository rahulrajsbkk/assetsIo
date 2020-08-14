import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';

import DashContractsChart from './DashContractsChart';
import btcIcon from '../../../static/images/usd-btc/btc.svg';
import usdIcon from '../../../static/images/usd-btc/usd.svg';
import { PortfolioContext } from '../../../context/PortfolioContext';
import { BankContext } from '../../../context/Context';
import { FormatCurrency } from '../../../utils/FunctionTools';

function DashContracts() {
  const { contractPreview } = useContext(PortfolioContext);
  const { coinListObject } = useContext(BankContext);
  const [selectedDetail, setSelectedDetail] = useState('');
  const { coin = 'USD' } = contractPreview;
  const [previewValueNative, setPreviewValueNative] = useState(0);
  const [valueShow, setValueShow] = useState(coin);
  const rate = coinListObject[contractPreview.coin].price.USD || 1;
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
          onClick={() => {
            setSelectedDetail(selectedDetail === '' ? 'deposit' : '');
            setPreviewValueNative(contractPreview.contractCost);
          }}
        >
          <div className="name">Deposit:</div>
          <div className="valueNbtn">
            <div className="value">
              ${FormatCurrency(contractPreview.contractCost * rate)}
            </div>
            <div className="btnView">
              {coin} <FontAwesomeIcon icon={faEye} />
            </div>
          </div>
        </div>
        <div className={`detailItem ${selectedDetail === ''}`}>
          <div className="name">Deposit Date:</div>
          <div className="date">
            {moment(contractPreview.start_timestamp).format('MMMM Do YYYY')}
          </div>
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
          onClick={() => {
            setSelectedDetail(selectedDetail === '' ? 'redeem' : '');
            setPreviewValueNative(contractPreview.redemptionAmount);
          }}
        >
          <div className="name">Redemption:</div>
          <div className="valueNbtn">
            <div className="value">
              ${FormatCurrency(contractPreview.redemptionAmount * rate)}
            </div>
            <div className="btnView">
              {coin} <FontAwesomeIcon icon={faEye} />
            </div>
          </div>
        </div>
        <div
          className={`detailItem ${
            selectedDetail === '' || selectedDetail === ''
          }`}
        >
          <div className="name">Redemption Date:</div>
          <div className="date">
            {moment(contractPreview.redemption_timestamp).format(
              'MMMM Do YYYY'
            )}
          </div>
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
          onClick={() => {
            setSelectedDetail(selectedDetail === '' ? 'term-annualised' : '');
          }}
        >
          <div className="name">Annualized Rate:</div>
          <div className="valueNbtn">
            <div className="value">24.00%</div>
            <div className="btnView">
              {coin} <FontAwesomeIcon icon={faEye} />
            </div>
          </div>
        </div>
        <div
          className={`detailItem ${
            selectedDetail === '' || selectedDetail === 'term-rate'
          }`}
          onClick={() => {
            setSelectedDetail(selectedDetail === '' ? 'term-rate' : '');
          }}
        >
          <div className="name">Term Rate (3M):</div>
          <div className="valueNbtn">
            <div className="value">8.00%</div>
            <div className="btnView">
              {coin} <FontAwesomeIcon icon={faEye} />
            </div>
          </div>
        </div>
        <div
          className={`detailItem ${
            selectedDetail === '' || selectedDetail === 'term-profit'
          }`}
          onClick={() => {
            setSelectedDetail(selectedDetail === '' ? 'term-profit' : '');
          }}
        >
          <div className="name">Fees From Profit:</div>
          <div className="valueNbtn">
            <div className="value down">$513.93</div>
            <div className="btnView">
              {coin} <FontAwesomeIcon icon={faEye} />
            </div>
          </div>
        </div>
        <div
          className={`detailItem ${
            selectedDetail === '' || selectedDetail === 'term-earnings'
          }`}
          onClick={() => {
            setSelectedDetail(selectedDetail === '' ? 'term-earnings' : '');
          }}
        >
          <div className="name">Net Earnings:</div>
          <div className="valueNbtn">
            <div className="value up">$2,134.34</div>
            <div className="btnView">
              {coin} <FontAwesomeIcon icon={faEye} />
            </div>
          </div>
        </div>
        <div
          className={`detailItem ${
            selectedDetail === '' || selectedDetail === 'term-daily'
          }`}
          onClick={() => {
            setSelectedDetail(selectedDetail === '' ? 'term-daily' : '');
          }}
        >
          <div className="name">90 Daily Payments:</div>
          <div className="valueNbtn">
            <div className="value up">$24,46</div>
            <div className="btnView">
              {coin} <FontAwesomeIcon icon={faEye} />
            </div>
          </div>
        </div>
        {selectedDetail ? (
          <div className="moreDetail">
            <div
              className={`btnBtcUsd ${valueShow === coin}`}
              onClick={() => setValueShow(coin)}
            >
              <img src={btcIcon} alt="" />
            </div>
            <div
              className={`btnBtcUsd ${valueShow === 'USD'}`}
              onClick={() => setValueShow('USD')}
            >
              <img src={usdIcon} alt="" />
            </div>
            <h4 className="value">
              {valueShow === coin
                ? FormatCurrency(previewValueNative, coin)
                : `$${FormatCurrency(previewValueNative * rate, 'USD')}`}
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
