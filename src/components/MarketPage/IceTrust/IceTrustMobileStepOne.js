import React from 'react';

function IceTrustMobileStepOne({ setStep }) {
  return (
    <div className="iceTrustMobileStep">
      <h3>DEFAN</h3>
      <h5>Trusts</h5>
      <p>
        A Defan (Decentralized Financial Assets Network) Trust Is A
        Programmticaly Controlled Storge Which Allows You To Transition Between
        CDP Smart Contracts & Traditional Debt Instruments. You Can Leverage The
        Bridge Inside A DEFI Assets Trust.{' '}
      </p>
      <p>
        Anyone Can Setup A Free Defi Assets Trust Where They Can Manage,
        Convert, & Leverage Their DEFI & Traditional Debt Instruments.
      </p>
      <div className="btnLearnMore" onClick={() => setStep(1)}>
        Learn More
      </div>
    </div>
  );
}

export default IceTrustMobileStepOne;
