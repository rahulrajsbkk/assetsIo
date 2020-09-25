import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { PortfolioContext } from '../../../context/PortfolioContext';
import iceLogo from '../../../static/images/logo.svg';
import next from '../../../static/images/nextColor.svg';
import btc from '../../../static/images/vault-methods/bitcoin.svg';
import eth from '../../../static/images/vault-methods/ethereum.svg';
import usdt from '../../../static/images/vault-methods/tether.svg';
import { BankContext } from '../../../context/Context';

function PortfolioGrowAssets() {
  const history = useHistory();
  const {
    setIcingStep,
    icingStep,
    coinContract,
    icingDays,
    createContractLoading,
    showGrowAssets,
    setShowGrowAssets,
    iceGrowTitle,
    setIceGrowTitle,
    pageOnClose,
    coinCheckOut,
    setIceEnable,
    iceEnable,
  } = useContext(PortfolioContext);
  const { coinListObject } = useContext(BankContext);

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
    <div
      className={`growAssets ${showGrowAssets} ${iceEnable ? 'opacive' : ''}`}
    >
      <div className={`head ${showGrowAssets}`}>
        <div
          className="textNBtns"
          onClick={() => {
            setShowGrowAssets(true);
            setIceGrowTitle('Icing An Asset With The');
          }}
        >
          {icingStep === 0 ? (
            <>
              <h6>
                {iceGrowTitle || (
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
        <div
          className="closeDiv"
          onClick={() => {
            setShowGrowAssets(false);
            setIcingStep(0);
            setIceGrowTitle('');
            history.push(pageOnClose);
          }}
        >
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      </div>
      <div className={`icingSteps ${createContractLoading}`}>
        <div
          className={`icingStep ${icingStep === 0}`}
          onClick={() => setIcingStep(0)}
        >
          {coinContract ? coinDetail : 'Choose Asset'}
        </div>
        <div
          className={`icingStep ${icingStep === 1}`}
          onClick={() => {
            if (coinContract) setIcingStep(1);
          }}
        >
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
        <div
          className={`icingStep ${icingStep === 2}`}
          onClick={() => {
            if (icingDays) setIcingStep(2);
          }}
        >
          {icingStep === 2 && coinCheckOut && coinCheckOut.coinSymbol ? (
            <div
              className="issueBond"
              onClick={() => {
                setIceEnable(true);
              }}
            >
              Issue My Bond
              <img src={next} alt="" />
            </div>
          ) : (
            'Issue Bond'
          )}
        </div>
      </div>
    </div>
  );
}

export default PortfolioGrowAssets;
