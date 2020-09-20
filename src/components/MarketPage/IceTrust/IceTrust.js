import React from 'react';
import assetsLogo from '../../../static/images/assetsLogo.svg';
import Scrollbars from 'react-custom-scrollbars';

import compound from '../../../static/images/marketLogos/compound.svg';
import curve from '../../../static/images/marketLogos/curve.svg';
import maker from '../../../static/images/marketLogos/maker.svg';
import mortage from '../../../static/images/marketLogos/mortage.svg';
import uniswap from '../../../static/images/marketLogos/uniswap.svg';

function IceTrust() {
  return (
    <>
      <div className="iceTrust">
        <div className="heading">
          <img src={assetsLogo} alt="" />
          DeFan Trusts
        </div>
        <p className="iceDesc">
          A Defan other wise known as Decentralized Financial Assets Network
          Trust Is A Programmticaly Controlled Storge Which Allows You To
          Transition Between CDP Smart Contracts & Traditional Debt Instruments.
          You Can Leverage The Bridge Inside A DEFI Assets Trust. Anyone Can
          Setup A Free Defi Assets Trust Where They Can Manage, Convert, &
          Leverage Their DEFI & Traditional Debt Instruments.
        </p>
        <div className="whatBridgeSupport">
          <div className="title">What Doest The Bridge Support? </div>
          <div className="listsContainer">
            <Scrollbars
              className="scrollList"
              renderThumbHorizontal={() => <div />}
              renderThumbVertical={() => <div />}
              renderView={(props) => (
                <div {...props} className="scrollListView" />
              )}
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
            </Scrollbars>
            <Scrollbars
              className="scrollList"
              renderThumbHorizontal={() => <div />}
              renderThumbVertical={() => <div />}
              renderView={(props) => (
                <div {...props} className="scrollListView" />
              )}
            >
              <div className="head">
                Traditional Debt Instruments (Coming Soon)
              </div>
              <div className="marketCard">
                <img src={mortage} alt="" />
                Mortage
              </div>
            </Scrollbars>
          </div>
        </div>
      </div>
      <div className="footer-main bridge-footer">Create DEFI Assets Trust</div>
    </>
  );
}

export default IceTrust;
