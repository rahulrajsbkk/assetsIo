import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import btc from '../../../static/images/coin-color/bitcoin.svg';
import eth from '../../../static/images/coin-color/ethereum.svg';
import usdt from '../../../static/images/coin-color/tether.svg';

function VaultCreateNewContract() {
  return (
    <div className="vault-new-contract">
      <div className="head">Create A New Ice Contract</div>
      <div className="content-steps">
        <div className="step-one">
          <h5>Step 1: Select Asset</h5>
          <div className="scroll-view">
            <div className="card">
              <img src={btc} alt="" />
              <div className="coin">Bitcoin</div>
              <div className="value">$104.2</div>
            </div>
            <div className="card">
              <img src={eth} alt="" />
              <div className="coin">Ethereum</div>
              <div className="value">$251.2</div>
            </div>
            <div className="card">
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
              <input type="text" />
              <div className="btn-days">
                <h6>
                  Days&nbsp;
                  <FontAwesomeIcon icon={faChevronDown} />
                </h6>
              </div>
            </div>
          </div>
          <div className="btn-calculate">
            <h5>Calculate ROI</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VaultCreateNewContract;
