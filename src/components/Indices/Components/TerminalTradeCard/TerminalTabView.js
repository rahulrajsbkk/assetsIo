import React, { useState, useContext, useEffect } from 'react';
import { OptionsContext } from '../../ContextAPI/OptionContext';
import Dropdown from 'antd/lib/dropdown/index';
import MenuLayout from '../MenuLayout/MenuLayout';

function TerminalTabView() {
  const {
    startTrade,
    setAmount,
    amount,
    seconds,
    setSeconds,
    balance,
    usdAmountFormatter,
  } = useContext(OptionsContext);

  const [time, setTime] = useState(1);

  const timeObj = {
    SECONDS: [30, 60, 120, 180, 240, 300],
    MINUTES: [1, 2, 3, 4, 5, 10, 30, 60],
    HOURS: [1, 2, 12, 24],
    DAYS: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
    ],
  };

  const [timeUnit, setTimeUnit] = useState({ val: 1, name: 'SECONDS' });
  const [timeIndex, setTimeIndex] = useState(0);
  const [timeArray, setTimeArray] = useState([]);

  useEffect(() => {
    let obj = timeObj[`${timeUnit.name}`];
    if (obj && obj[0]) {
      setTimeArray(obj);
      setTime(obj[0]);
    }
    setTimeIndex(0);
  }, [timeUnit]);

  const addTime = () => {
    if (timeIndex < timeArray.length - 1) {
      setTime(timeArray[timeIndex + 1]);
      setTimeIndex(timeIndex + 1);
    }
  };
  const subTime = () => {
    if (timeIndex > 0) {
      setTime(timeArray[timeIndex - 1]);
      setTimeIndex(timeIndex - 1);
    }
  };

  const [timeToggle, setTimeToggle] = useState(false);
  const timeMenu = (
    <MenuLayout className="menu-btc-eth">
      <div
        className="d-flex menu-itm justify-content-between"
        onClick={() => {
          setTimeToggle(false);
          setTimeUnit({ val: 1, name: 'SECONDS' });
        }}
      >
        <i className="icon far fa-clock mx-1 my-1" />
        <h3 className="my-auto">Seconds</h3>
      </div>
      <div
        className="d-flex menu-itm justify-content-between"
        onClick={() => {
          setTimeToggle(false);
          setTimeUnit({ val: 60, name: 'MINUTES' });
        }}
      >
        <i className="icon far fa-clock mx-1 my-1" />
        <h3 className="my-auto">Minutes</h3>
      </div>
      <div
        className="d-flex menu-itm justify-content-between"
        onClick={() => {
          setTimeToggle(false);
          setTimeUnit({ val: 3600, name: 'HOURS' });
        }}
      >
        <i className="icon far fa-clock mx-1 my-1" />
        <h3 className="my-auto">Hours</h3>
      </div>
      <div
        className="d-flex menu-itm justify-content-between"
        onClick={() => {
          setTimeToggle(false);
          setTimeUnit({ val: 86400, name: 'DAYS' });
        }}
      >
        <i className="icon far fa-clock mx-1 my-1" />
        <h3 className="my-auto">Days</h3>
      </div>
    </MenuLayout>
  );

  useEffect(() => {
    setSeconds(timeUnit.val * time);
  }, [time, timeUnit]);

  return (
    <div
      className="d-flex tabview-call-put justify-content-around flex-grow-1 flex-column px-3"
      id="tabViewTerminal"
    >
      <div>
        <h6 className="text-white justify-content-between d-flex">
          Amount <span>Balance: ${usdAmountFormatter.format(balance)}</span>
        </h6>
        <div className="d-flex input-num">
          <button
            className="btn-max"
            onClick={() => setAmount((balance * 0.5).toFixed(2))}
          >
            50%
          </button>
          <button
            className="btn-max"
            onClick={() => setAmount((balance * 0.25).toFixed(2))}
          >
            25%
          </button>
          <button
            className="btn-max"
            onClick={() => setAmount((balance * 0.1).toFixed(2))}
          >
            10%
          </button>
          <input
            type="number"
            className="d-flex"
            min={0}
            value={amount}
            step={1}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="$0.00"
          />
        </div>
      </div>
      <div>
        <h6 className="text-white">Timer</h6>
        <div className="d-flex justify-content-between">
          <div className="d-flex input-num time">
            <button className="btn-num border-right" onClick={subTime}>
              -
            </button>
            <input
              type="number"
              className="d-flex"
              min={0}
              value={time}
              step={1}
              readOnly
            />
            <button className="btn-num border-left" onClick={addTime}>
              +
            </button>
          </div>
          <Dropdown
            overlay={timeMenu}
            visible={timeToggle}
            onVisibleChange={() => setTimeToggle(!timeToggle)}
            getPopupContainer={() => document.getElementById('tabViewTerminal')}
          >
            <div className="d-flex input-dropdown time">
              <div className="drop my-auto">{timeUnit.name}</div>
              <button className="btn-dropdown border-left">
                <i className="fas fa-chevron-down" />
              </button>
            </div>
          </Dropdown>
        </div>
      </div>
      <div>
        <h6 className="text-white">Profit Potential</h6>
        <div className="d-flex input-num">
          <div className="border-right profit d-flex">
            <div className="my-auto mx-auto">50%</div>
          </div>
          <div className="profit d-flex">
            <div className="my-auto mx-auto">
              $
              {isNaN(amount * 0.5)
                ? '0.00'
                : usdAmountFormatter.format(amount * 0.5)}
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <button
          className="d-flex btn justify-content-center btn btn-success"
          onClick={() => startTrade(true)}
        >
          <h3 className="my-auto">LONG</h3>
          <h3 className="fas fa-arrow-up mx-2 my-auto" />
        </button>
        <button
          className="d-flex btn justify-content-center btn btn-danger"
          onClick={() => startTrade(false)}
        >
          <h3 className="my-auto">SHORT</h3>
          <h3 className="fas fa-arrow-down mx-2 my-auto" />
        </button>
      </div>
    </div>
  );
}

export default TerminalTabView;
