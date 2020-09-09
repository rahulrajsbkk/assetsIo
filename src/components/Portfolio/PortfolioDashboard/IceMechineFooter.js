import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { BankContext } from '../../../context/Context';
import { PortfolioContext } from '../../../context/PortfolioContext';
import iceLogo from '../../../static/images/logo.svg';

function IceMechineFooter({ pageOnClose = '/' }) {
  const { email } = useContext(BankContext);
  const history = useHistory();
  const { setShowGrowAssets, setIceGrowTitle, setPageOnClose } = useContext(
    PortfolioContext
  );
  return (
    <div className={`growAssets${email ? '' : ' d-none'}`}>
      <div className="head">
        <div
          className="textNBtns"
          onClick={() => {
            if (email) {
              setShowGrowAssets(true);
              setIceGrowTitle('Icing An Asset With The');
              setPageOnClose(pageOnClose);
              history.push('/iceAsset');
            }
          }}
        >
          <h6>
            <u>Click Here</u> To Use The
          </h6>
          <img src={iceLogo} alt="" />
          <h6>Machine</h6>
        </div>
      </div>
    </div>
  );
}

export default IceMechineFooter;
