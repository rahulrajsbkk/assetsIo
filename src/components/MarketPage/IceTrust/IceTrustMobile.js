import React, { useState } from 'react';
import IceTrustMobileStepOne from './IceTrustMobileStepOne';
import IceTrustMobileStepTwo from './IceTrustMobileStepTwo';

function IceTrustMobile() {
  const [step, setStep] = useState(0);
  const steps = [
    <IceTrustMobileStepOne setStep={setStep} />,
    <IceTrustMobileStepTwo />,
  ];
  return <div className="iceTrustMobile">{steps[step]}</div>;
}

export default IceTrustMobile;
