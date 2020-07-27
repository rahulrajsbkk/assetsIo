import React, { useState, useContext } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import next from '../../../static/images/next-anim.svg';
import { BankContext } from '../../../context/Context';

const validNumber = new RegExp(/^\d*\.?\d*$/);

function VaultCreateNewContract() {
  const { coinList } = useContext(BankContext);
  const usdAmountFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const [duration, setDuration] = useState('');
  const [durationUnit, setDurationUnit] = useState('Days');
  const [selectedCard, setSelectedCard] = useState('');
  const [durationDropDownOpen, setDurationDropDownOpen] = useState(false);
  const onDurationchange = (e) => {
    const { value } = e.target;
    if (value === '' || validNumber.test(value)) setDuration(value);
  };

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
                className={`card ${
                  selectedCard === '' || selectedCard === 'btc'
                }`}
                onClick={() => setSelectedCard('btc')}
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
          <div className="btn-calculate">
            <h5>
              Calculate ROI
              <img src={next} alt="" />
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VaultCreateNewContract;
