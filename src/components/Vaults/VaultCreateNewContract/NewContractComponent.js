import React, { useState, useContext, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import next from '../../../static/images/next-anim.svg';

import { BankContext } from '../../../context/Context';
import { VaultContext } from '../../../context/VaultContext';

const validNumber = new RegExp(/^\d*\.?\d*$/);

function NewContractComponent() {
  const { coinList } = useContext(BankContext);
  const {
    coinContract,
    setCoinContract,
    setDaysToHold,
    calculateRoi,
    dashTab,
    confirmContract,
  } = useContext(VaultContext);
  const usdAmountFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const [duration, setDuration] = useState('');
  const [durationUnit, setDurationUnit] = useState('Days');
  const [durationDropDownOpen, setDurationDropDownOpen] = useState(false);
  const onDurationchange = (e) => {
    const { value } = e.target;
    if (value === '' || validNumber.test(value)) setDuration(value);
  };

  useEffect(() => {
    switch (durationUnit) {
      case 'Weeks':
        setDaysToHold(duration * 7);
        break;
      case 'Months':
        setDaysToHold(duration * 30);
        break;
      default:
        setDaysToHold(duration);
        break;
    }
  }, [duration, durationUnit, setDaysToHold]);
  return (
    <div className="vault-new-contract">
      <div className="head">Create A New Ice Contract</div>
      <div className="content-steps">
        <div className="step-one">
          <h5>Step 1: Select Asset</h5>
          <Scrollbars
            autoHide
            className="scroll-view"
            renderTrackVertical={(props) => (
              <div {...props} className="d-none" />
            )}
            renderThumbVertical={(props) => (
              <div {...props} className="d-none" />
            )}
            renderView={(props) => <div {...props} className="scroll-view" />}
          >
            {coinList.map((coin) => (
              <div
                key={coin.coinSymbol}
                className={`card ${
                  coinContract === '' || coinContract === coin.coinSymbol
                }`}
                onClick={() => setCoinContract(coin.coinSymbol)}
              >
                <img src={coin.coinImage} alt="" />
                <div className="coin">{coin.coinName}</div>
                <div className="value">
                  ${usdAmountFormatter.format(coin.price.USD)}
                </div>
              </div>
            ))}
          </Scrollbars>
        </div>
        <div className="step-two">
          <div className="period-hold">
            <h5>Step 2: Select Time Period</h5>
            <div className="days">
              <input type="text" value={duration} onChange={onDurationchange} />
              <div
                className="btn-days-wrapper"
                onClick={() => setDurationDropDownOpen(!durationDropDownOpen)}
              >
                <div className={'btn-days ' + durationDropDownOpen}>
                  <h5>
                    {durationUnit}&nbsp;
                    <FontAwesomeIcon icon={faCaretDown} />
                  </h5>
                  <h6
                    className={`${durationUnit === 'Days' ? 'd-none' : ''}`}
                    onClick={() => setDurationUnit('Days')}
                  >
                    Days&nbsp;
                  </h6>
                  <h6
                    className={`${durationUnit === 'Weeks' ? 'd-none' : ''}`}
                    onClick={() => setDurationUnit('Weeks')}
                  >
                    Weeks&nbsp;
                  </h6>
                  <h6
                    className={`${durationUnit === 'Months' ? 'd-none' : ''}`}
                    onClick={() => setDurationUnit('Months')}
                  >
                    Months&nbsp;
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div
            className="btn-calculate"
            onClick={dashTab === 'Dashboard' ? calculateRoi : confirmContract}
          >
            <h5>
              {dashTab === 'Dashboard' ? 'Calculate ROI' : 'Confirm Details'}
              <img src={next} alt="" />
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewContractComponent;
