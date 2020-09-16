import React, { useState, useContext, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import moment from 'moment';
import { PortfolioContext } from '../../../context/PortfolioContext';
import { BankContext } from '../../../context/Context';
import { FormatCurrency, FormatNumber } from '../../../utils/FunctionTools';
import { ReactComponent as GraphTriangle } from '../../../static/images/graphTriangle.svg';
import OnOutsideClick from '../../../utils/OnOutsideClick';

function PortfolioSetDays() {
  const ref = useRef();
  const dropdownRef = useRef();
  OnOutsideClick(dropdownRef, () => setMenuOpen(false));
  const [days, setDays] = useState(0);
  const [totalDays, setTotalDays] = useState(365);
  const [boxStyle, setBoxStyle] = useState({ bottom: 20, left: 612 });

  useEffect(() => {
    const baseWidth = ref.current.clientWidth - 725;
    const baseHeight = baseWidth * 0.384;
    setBoxStyle({
      bottom: 20 + (baseHeight * days) / totalDays,
      left: 612 + (baseWidth * days) / totalDays,
    });
  }, [days, totalDays]);
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    coinContract,
    setCoinContract,
    setIcingDays,
    setIcingStep,
  } = useContext(PortfolioContext);
  const { conractsObj, coinListObject } = useContext(BankContext);

  const [contractDayStats, setContractDayStats] = useState([]);
  useEffect(() => {
    if (totalDays && coinContract && conractsObj && conractsObj[coinContract])
      Axios.get(
        `https://comms.globalxchange.com/coin/iced/contract/interest/rate/stats?days=${totalDays}&coin=${coinContract}&contractValue=${conractsObj[coinContract].amount}`
      ).then((res) => {
        const { data } = res;
        if (data.status) {
          setContractDayStats(data.dayStats);
        }
      });
  }, [totalDays, coinContract, conractsObj]);

  return (
    <div ref={ref} className="portfolioAssets time">
      <div className="assetsText">
        <div className="title">Configure Time</div>
        <div className="detail">
          You Are Able To Set Any Length Of Time Of For Your Bond. The Length Of
          TIme You Select Dictactes The Daily Interest Rate &amp; Resale Value
          Of The Bond.
        </div>
        <div className="bondTypes pb-p-25">
          <div className="bondTypesText">Selected Bond: </div>
          <div className="drop-select" ref={dropdownRef}>
            <div
              className="content bond"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {coinListObject[coinContract].coinName} Bond -
              <span>
                {FormatCurrency(conractsObj[coinContract].amount, coinContract)}
                &nbsp;
                {coinContract}
              </span>
              <FontAwesomeIcon
                className="ml-2"
                icon={menuOpen ? faCaretUp : faCaretDown}
              />
            </div>
            {menuOpen ? (
              <div className="menu">
                {Object.keys(conractsObj).map((key) => {
                  return (
                    <div
                      className={`menuItem d-flex justify-content-between ${
                        coinContract === key ? 'd-none' : ''
                      }`}
                      onClick={() => {
                        setMenuOpen(false);
                        setCoinContract(key);
                      }}
                    >
                      {coinListObject[key].coinName} Bond -
                      <span>
                        {FormatCurrency(conractsObj[key].amount, key)}
                        {key}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className="assetsContent"></div>
      <input
        value={days}
        type="range"
        min={0}
        max={totalDays}
        onChange={(e) => {
          setDays(e.target.value);
        }}
        className="range"
      />
      <div className="daysSwitcher">
        <div
          className={`option ${totalDays === 30}`}
          onClick={() => setTotalDays(30)}
        >
          1 Month
        </div>
        <div
          className={`option ${totalDays === 365}`}
          onClick={() => setTotalDays(365)}
        >
          1 Year
        </div>
        <div
          className={`option ${totalDays === 1825}`}
          onClick={() => setTotalDays(1825)}
        >
          5 Years
        </div>
      </div>
      <div className="today">{moment().format('MMMM Do YYYY')}</div>
      <div className="sliderMobile">
        <GraphTriangle />
        <input
          value={days}
          type="range"
          min={0}
          max={totalDays}
          onChange={(e) => {
            setDays(e.target.value);
          }}
          className="range-mobile"
        />
        <div className="daysSwitcher">
          <div
            className={`option ${totalDays === 30}`}
            onClick={() => setTotalDays(30)}
          >
            1 Month
          </div>
          <div
            className={`option ${totalDays === 365}`}
            onClick={() => setTotalDays(365)}
          >
            1 Year
          </div>
          <div
            className={`option ${totalDays === 1825}`}
            onClick={() => setTotalDays(1825)}
          >
            5 Years
          </div>
        </div>
      </div>
      <div className="timeDetail" style={boxStyle}>
        <div className="head">
          <span className="days">{days} Days</span>
          {days ? (
            <span
              className="confirm"
              onClick={() => {
                setIcingDays(days);
                setIcingStep(2);
              }}
            >
              Confirm
            </span>
          ) : (
            ''
          )}
        </div>
        <div className="content">
          <div className="contentIn">
            <div className="value">
              {FormatNumber(
                days &&
                  contractDayStats &&
                  contractDayStats[days - 1] &&
                  contractDayStats[days - 1].interest,
                2
              )}
              %
            </div>
            <div className="label">Daily Rate</div>
          </div>
          <div className="contentIn">
            <div className="value">
              {FormatNumber(
                days &&
                  contractDayStats &&
                  contractDayStats[days - 1] &&
                  contractDayStats[days - 1].roiPercentage,
                2
              )}
              %
            </div>
            <div className="label">Total ROI</div>
          </div>
          <div className="contentIn">
            <div className="value">
              {FormatCurrency(
                days &&
                  contractDayStats &&
                  contractDayStats[days - 1] &&
                  contractDayStats[days - 1].dailyAmount,
                coinContract
              )}
            </div>
            <div className="label">Daily Earning ({coinContract})</div>
          </div>
          <div className="contentIn">
            <div className="value">
              {FormatCurrency(
                days &&
                  contractDayStats &&
                  contractDayStats[days - 1] &&
                  contractDayStats[days - 1].dailyAmount * days,
                coinContract
              )}
            </div>
            <div className="label">Total Earnings ({coinContract})</div>
          </div>
        </div>
      </div>
      {days / totalDays > 0.25 ? (
        <div className="nextDay" style={{ left: boxStyle.left }}>
          {moment().add('days', days).format('MMMM Do YYYY')}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default PortfolioSetDays;
