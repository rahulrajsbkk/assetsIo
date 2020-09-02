import React, { useState, useContext } from 'react';
import Lottie from 'react-lottie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { PortfolioContext } from '../../../context/PortfolioContext';
import * as animationData from '../../../static/animations/cpu-loading.json';
import NewContractComponent from '../VaultCreateNewContract/NewContractComponent';
import NewContractInitiate from '../VaultCreateNewContract/NewContractInitiate';
import iceLogo from '../../../static/images/logo.svg';

function PortfolioGrowAssets() {
  const [showGrowAssets, setShowGrowAssets] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    className: 'carousel-status',
  };

  const { loadingCnfrm, roiStep, dashTab, setDashTab } = useContext(
    PortfolioContext
  );

  const steps = [<NewContractComponent />, <NewContractInitiate />];

  const [growAsset, setGrowAsset] = useState('');
  const [title, setTitle] = useState('');

  function getContent(growAsset) {
    switch (growAsset) {
      case 'iceAsset':
        return (
          <>
            {loadingCnfrm ? (
              <div className="loading-anim">
                <Lottie options={defaultOptions} height={150} width={150} />
              </div>
            ) : (
              steps[roiStep]
            )}
          </>
        );
      case '':
        return (
          <div className="buttonsList">
            <div
              className="btnAsset"
              onClick={() => {
                setGrowAsset('iceAsset');
                setTitle('Icing An Asset With The');
                setDashTab('Assets');
              }}
            >
              Ice An Asset
            </div>
            <div
              className="btnAsset"
              style={{ cursor: 'progress', opacity: '0.3' }}
              // onClick={() => {
              //   setGrowAsset('createAsset');
              //   setTitle('');
              // }}
            >
              Create An Asset
            </div>
            <div
              className="btnAsset"
              style={{ cursor: 'progress', opacity: '0.3' }}
              // onClick={() => {
              //   setGrowAsset('createIndex');
              //   setTitle('');
              // }}
            >
              Create An Index
            </div>
          </div>
        );
      default:
        return <></>;
    }
  }

  return (
    <div className={`growAssets ${showGrowAssets}`}>
      <div className={`head ${showGrowAssets}`}>
        <div className="textNBtns">
          <h6>{title}</h6>
          <img src={iceLogo} alt="" />
          <h6>Machine</h6>
          <div
            className={`btnsAsset ${
              growAsset === '' && showGrowAssets ? 'd-none' : ''
            }`}
          >
            <div
              className={`btnAsset invert ${
                growAsset === 'iceAsset' ? 'd-none' : ''
              }`}
              onClick={() => {
                setGrowAsset('iceAsset');
                setShowGrowAssets(true);
                setTitle('Icing An Asset With The');
                setDashTab('Assets');
              }}
            >
              Ice An Asset
            </div>
            <div
              style={{ cursor: 'progress', opacity: '0.3' }}
              className="btnAsset"
              onClick={() => {
                setGrowAsset('createAsset');
                setTitle('Creating An Asset With The');
              }}
            >
              Create An Asset
            </div>
            <div
              style={{ cursor: 'progress', opacity: '0.3' }}
              className="btnAsset"
              onClick={() => {
                setGrowAsset('createIndex');
                setTitle('Creating An Index With The');
              }}
            >
              Create An Index
            </div>
          </div>
        </div>
        <div
          className="btnShowHide"
          onClick={() => {
            setGrowAsset('');
            setShowGrowAssets(!showGrowAssets);
            setTitle('');
          }}
        >
          <FontAwesomeIcon icon={showGrowAssets ? faCaretDown : faCaretUp} />
        </div>
      </div>
      {getContent(growAsset)}
    </div>
  );
}

export default PortfolioGrowAssets;
