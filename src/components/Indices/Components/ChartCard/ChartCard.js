import React, { useState, useContext } from 'react';
import BtcUsdtChart from './BtcUsdtChart';
import MenuLayout from '../MenuLayout/MenuLayout';
import Dropdown from 'antd/lib/dropdown/index';
import { OptionsContext } from '../../ContextAPI/OptionContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';

function ChartCard({ fullScreen, setFullScreen }) {
  const {
    setSearchOn,
    tickerTime,
    setTickerTime,
    coinDetail,
    exchDetail,
    setIsExchange,
  } = useContext(OptionsContext);
  const time = {
    '1s': '1 Second',
    '30s': '30 Second',
    '1m': '1 Minute',
    '5m': '5 Minute',
  };
  const [timeToggle, setTimeToggle] = useState(false);
  const timeMenu = (
    <MenuLayout className="menu-chart">
      <div
        className={
          'input-dropdown ' + (tickerTime === '1s' ? 'd-none' : 'd-flex')
        }
        onClick={() => {
          setTickerTime('1s');
          setTimeToggle(false);
        }}
      >
        <i className="icon far fa-clock mx-2 my-auto" />
        <div className="drop">{time['1s']}</div>
      </div>
      <div
        className={
          'input-dropdown ' + (tickerTime === '30s' ? 'd-none' : 'd-flex')
        }
        onClick={() => {
          setTickerTime('30s');
          setTimeToggle(false);
        }}
      >
        <i className="icon far fa-clock mx-2 my-auto" />
        <div className="drop">{time['30s']}</div>
      </div>
      <div
        className={
          'input-dropdown ' + (tickerTime === '1m' ? 'd-none' : 'd-flex')
        }
        onClick={() => {
          setTickerTime('1m');
          setTimeToggle(false);
        }}
      >
        <i className="icon far fa-clock mx-2 my-auto" />
        <div className="drop">{time['1m']}</div>
      </div>
      <div
        className={
          'input-dropdown ' + (tickerTime === '5m' ? 'd-none' : 'd-flex')
        }
        onClick={() => {
          setTickerTime('5m');
          setTimeToggle(false);
        }}
      >
        <i className="icon far fa-clock mx-2 my-auto" />
        <div className="drop">{time['5m']}</div>
      </div>
    </MenuLayout>
  );
  return (
    <div className="card chart-card card-dark flex-grow-1 h-100 d-flex flex-column">
      <div className="d-flex chart-head">
        <div className="my-auto">
          <div
            className="d-flex input-dropdown my-1 mx-2"
            onClick={() => {
              setFullScreen(!fullScreen);
            }}
          >
            <FontAwesomeIcon
              className="icon"
              icon={fullScreen ? faCompress : faExpand}
            />
          </div>
        </div>
        <div className="my-auto">
          <div className="d-flex input-dropdown mx-2">
            <div
              className="d-flex"
              onClick={() => {
                setSearchOn(false);
                setIsExchange(false);
              }}
            >
              <img className="icon" src={coinDetail.icon} alt="" />
              <div className="drop">{coinDetail.name}</div>
              <div className="divider" />
            </div>
            <button
              className="btn-dropdown my-auto"
              onClick={() => {
                setSearchOn(true);
                setIsExchange(false);
              }}
            >
              <i className="fas fa-search" />
            </button>
          </div>
        </div>

        <div className="mx-2 my-auto dis-terminal">
          <div className="d-flex input-dropdown">
            <div
              className="d-flex"
              onClick={() => {
                setSearchOn(false);
                setIsExchange(true);
              }}
            >
              <img className="icon" src={exchDetail.icon} alt="" />
              <div className="drop">{exchDetail.name}</div>
              <div className="divider" />
            </div>
            <button
              className="btn-dropdown my-auto"
              onClick={() => {
                setSearchOn(true);
                setIsExchange(true);
              }}
            >
              <i className="fas fa-search" />
            </button>
          </div>
        </div>

        <Dropdown
          className="ml-auto"
          overlay={timeMenu}
          visible={timeToggle}
          onVisibleChange={() => setTimeToggle(!timeToggle)}
        >
          <div className="d-flex input-dropdown my-1 mx-2">
            <FontAwesomeIcon className="icon mx-2 my-auto" icon={faClock} />
            <i className="icon far fa-clock" />
            <div className="drop">{time[tickerTime]}</div>
            <div className="divider" />
            <button className="btn-dropdown my-auto">
              <i
                className={
                  timeToggle ? 'fas fa-chevron-up' : 'fas fa-chevron-down'
                }
              />
            </button>
          </div>
        </Dropdown>
      </div>
      <div className="d-flex flex-grow-1 p-1" style={{ overflow: 'hidden' }}>
        <BtcUsdtChart />
      </div>
    </div>
  );
}

export default ChartCard;
