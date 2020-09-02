import React, { useState, useContext } from 'react';
import { PortfolioContext } from '../../../context/PortfolioContext';
import iceLogo from '../../../static/images/logo.svg';

function PortfolioGrowAssets() {
  const [showGrowAssets, setShowGrowAssets] = useState(false);

  const { setDashTab, icingStep, setIcingStep } = useContext(PortfolioContext);

  const [title, setTitle] = useState('');

  return (
    <div className={`growAssets ${showGrowAssets}`}>
      <div className={`head ${showGrowAssets}`}>
        <div
          className="textNBtns"
          onClick={() => {
            setShowGrowAssets(true);
            setTitle('Icing An Asset With The');
            setDashTab('Assets');
          }}
        >
          <h6>
            {title || (
              <>
                <u>Click Here</u> To Use The
              </>
            )}
          </h6>
          <img src={iceLogo} alt="" />
          <h6>Machine</h6>
        </div>
      </div>
      <div className="icingSteps">
        <div className={`icingStep ${icingStep === 0}`}>Choose Asset</div>
        <div className="icingStep">Configure Time</div>
        <div className="icingStep">Set Leverage</div>
      </div>
    </div>
  );
}

export default PortfolioGrowAssets;
