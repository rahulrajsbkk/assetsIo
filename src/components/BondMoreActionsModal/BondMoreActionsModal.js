import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { useHistory } from 'react-router-dom';
import logo from '../../static/images/assetsLogo.svg';

function BondMoreActionsModal({ bondId, onClose }) {
  const history = useHistory();
  const [isCopied, setIsCopied] = useState(false);
  return (
    <div className="moreActionsWrapper">
      <div className="overlayClose" onClick={() => onClose()}></div>
      <div className="contentCard">
        <div className="head">
          <img src={logo} alt="" />
          Bond Actions
        </div>
        <div className="content">
          <div className="label">Assest Hash ID</div>
          <div className="bondId">
            {isCopied ? 'Copied To Clipboard' : bondId}
            <FontAwesomeIcon
              icon={faCopy}
              onClick={() => {
                navigator.clipboard.writeText(bondId).then(() => {
                  setIsCopied(true);
                  setTimeout(() => {
                    setIsCopied(false);
                  }, 2000);
                });
              }}
            />
          </div>
          <div className="label">
            Current Interest Payout Configuration
            <div className="btnChange">Change</div>
          </div>
          <div className="buttonBox">Into Fixed Income Vault</div>
          <div className="label">
            Current Interest Payout Notification
            <div className="btnChange">Change</div>
          </div>
          <div className="buttonBox">Email</div>
        </div>
        <div
          className="footerBtn"
          onClick={() => {
            history.push(`/bonds/${bondId}`);
          }}
        >
          Go To Asset Hash For This Bond
        </div>
      </div>
    </div>
  );
}

export default BondMoreActionsModal;
