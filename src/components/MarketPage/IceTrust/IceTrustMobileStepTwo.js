import React from 'react';
import Scrollbars from 'react-custom-scrollbars';

import compound from '../../../static/images/marketLogos/compound.svg';
import curve from '../../../static/images/marketLogos/curve.svg';
import maker from '../../../static/images/marketLogos/maker.svg';
import mortage from '../../../static/images/marketLogos/mortage.svg';
import uniswap from '../../../static/images/marketLogos/uniswap.svg';

function IceTrustMobileStepTwo() {
  return (
    <div className="iceTrustMobileStep">
      <h3>DEFAN</h3>
      <h6>What Can Your New Defan Trust Support? </h6>
      <Scrollbars
        className="scrollList"
        renderThumbHorizontal={() => <div />}
        renderThumbVertical={() => <div />}
        renderView={(props) => <div {...props} className="scrollListView" />}
      >
        <div className="head">Blockchain Based Protocols</div>
        <div
          className="marketCard"
          style={{
            background: '#1AAB9A',
            color: 'white',
          }}
        >
          <img src={maker} alt="" />
          MakerDAO
        </div>
        <div
          className="marketCard"
          style={{
            background: '#0AD394',
            color: 'white',
          }}
        >
          <img src={compound} alt="" />
          Compound
        </div>
        <div
          className="marketCard"
          style={{
            background: '#DC6BE5',
            color: 'white',
          }}
        >
          <img src={uniswap} alt="" />
          Uniswap
        </div>
        <div
          className="marketCard"
          style={{
            background: '#3465A4',
            color: 'white',
          }}
        >
          <img src={curve} alt="" />
          Curve
        </div>
        <div className="head">Traditional Assets</div>
        <div className="marketCard">
          <img src={mortage} alt="" />
          Mortage
        </div>
        <div className="btnSetup">Setup Your DEFAN</div>
      </Scrollbars>
    </div>
  );
}

export default IceTrustMobileStepTwo;
