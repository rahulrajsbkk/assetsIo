import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function DeCentralizedTrust() {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="login-enter decentralised">
      <h2 className="login-text">Decentralized</h2>
      <div className="gx-account-text">
        A Unique Ethereum Contract Which You Control
      </div>
      <p>
        You Have To Connect A Metamask Chome Client And Then That Wallet Will
        Become The Owner Or Authority Of This Account.
      </p>
      <p>
        Funds in your DeFan Vault Are separate from your funds in your current
        wallet; and GX has its own address and maintains its own assets.
      </p>
      <button type="submit" className="btn-primary-col disable">
        Coming Soon
      </button>
    </div>
  );
}

export default DeCentralizedTrust;
