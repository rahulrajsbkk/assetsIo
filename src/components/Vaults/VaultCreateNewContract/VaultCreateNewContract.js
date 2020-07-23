import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import btc from '../../../static/images/coin-color/bitcoin.svg';
import eth from '../../../static/images/coin-color/ethereum.svg';
import usdt from '../../../static/images/coin-color/tether.svg';
import next from '../../../static/images/next-anim.svg';

const validNumber = new RegExp(/^\d*\.?\d*$/);

function VaultCreateNewContract() {
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
          <div className="scroll-view">
            <div
              className={`card ${
                selectedCard === '' || selectedCard === 'btc'
              }`}
              onClick={() => setSelectedCard('btc')}
            >
              <img src={btc} alt="" />
              <div className="coin">Bitcoin</div>
              <div className="value">$104.20</div>
            </div>
            <div
              className={`card ${
                selectedCard === '' || selectedCard === 'eth'
              }`}
              onClick={() => setSelectedCard('eth')}
            >
              <img src={eth} alt="" />
              <div className="coin">Ethereum</div>
              <div className="value">$251.20</div>
            </div>
            <div
              className={`card ${
                selectedCard === '' || selectedCard === 'usdt'
              }`}
              onClick={() => setSelectedCard('usdt')}
            >
              <img src={usdt} alt="" />
              <div className="coin">Tether</div>
              <div className="value">$47.28</div>
            </div>
          </div>
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
