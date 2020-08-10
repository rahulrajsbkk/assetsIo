import React, { useContext } from 'react';
import Lottie from 'react-lottie';

import * as animationData from '../../../static/animations/cpu-loading.json';
import { PortfolioContext } from '../../../context/PortfolioContext';
import NewContractComponent from './NewContractComponent';
import NewContractInitiate from './NewContractInitiate';

function VaultCreateNewContract() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    className: 'carousel-status',
  };

  const { loadingCnfrm, roiStep } = useContext(PortfolioContext);

  const steps = [<NewContractComponent />, <NewContractInitiate />];

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
}

export default VaultCreateNewContract;
