import React from 'react';
import assetsLogo from '../../../static/images/assetsLogo.svg';

function IceBridge() {
  return (
    <div className="iceBridge">
      <div className="heading">
        <img src={assetsLogo} alt="" />
        Assets.io Bridge
      </div>
      <p className="iceDesc">
        The Assets.io Bridge Allows You To Transition Between CDP Smart
        Contracts & Traditional Debt Instruments. You Can Leverage The Bridge
        Inside A DEFI Assets Trust. Anyone Can Setup A Free Defi Assets Trust
        Where They Can Manage, Convert, & Leverage Their DEFI & Traditional Debt
        Instruments.
      </p>
      <div className="whatBridgeSupport">
        <div className="title">What Doest The Bridge Support? </div>
      </div>
    </div>
  );
}

export default IceBridge;
