import React, { useState, useContext } from 'react';
import { PortfolioContext } from '../../../context/PortfolioContext';
import iceLogo from '../../../static/images/logo.svg';
import btc from '../../../static/images/vault-methods/bitcoin.svg';
import eth from '../../../static/images/vault-methods/ethereum.svg';
import usdt from '../../../static/images/vault-methods/tether.svg';
import { BankContext } from '../../../context/Context';

function PortfolioGrowAssets() {
  const [showGrowAssets, setShowGrowAssets] = useState(false);

  const { setDashTab, icingStep, coinContract, icingDays } = useContext(
    PortfolioContext
  );
  const { coinListObject } = useContext(BankContext);

  const [title, setTitle] = useState('');

  const getCoinLogo = () => {
    switch (coinContract) {
      case 'BTC':
        return (
          <div className="img">
            <img src={btc} alt="" className="logoFull" />
          </div>
        );
      case 'ETH':
        return (
          <div className="img">
            <img src={eth} alt="" className="logoFull" />
          </div>
        );
      case 'USDT':
        return (
          <div className="img">
            <img src={usdt} alt="" className="logoFull" />
          </div>
        );

      default:
        return (
          <div className="img">
            <img
              src={
                coinListObject &&
                coinContract &&
                coinListObject[coinContract] &&
                coinListObject[coinContract].coinImage
              }
              alt=""
              className="logo"
            />
            <div className="coinName">
              {coinListObject &&
                coinContract &&
                coinListObject[coinContract] &&
                coinListObject[coinContract].coinName}
            </div>
          </div>
        );
    }
  };

  const coinDetail = (
    <div className="detailCoin">
      {getCoinLogo()}
      <h6>Asset</h6>
    </div>
  );

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
          {icingStep === 0 ? (
            <>
              <h6>
                {title || (
                  <>
                    <u>Click Here</u> To Use The
                  </>
                )}
              </h6>
              <img src={iceLogo} alt="" />
              <h6>Machine</h6>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="icingSteps">
        <div className={`icingStep ${icingStep === 0}`}>
          {coinContract ? coinDetail : 'Choose Asset'}
        </div>
        <div className={`icingStep ${icingStep === 1}`}>
          {icingDays ? (
            <div className="detailCoin">
              <div className="img">
                <div className="coinName">{icingDays} Days</div>
              </div>
              <h6>Time</h6>
            </div>
          ) : (
            'Configure Time'
          )}
        </div>
        <div className={`icingStep ${icingStep === 2}`}>Set Leverage</div>
      </div>
    </div>
  );
}

export default PortfolioGrowAssets;
