import React from 'react';
import Zoom from 'react-reveal/Zoom';
import Layout from '../Layout/Index';
import logo from '../static/images/logo-text.svg';
import android from '../static/images/android.svg';
import ios from '../static/images/ios.svg';

function MobileApps() {
  return (
    <Layout active="mobileApps" className="mobileApps">
      <Zoom>
        <div className="logo-n-title">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="title">Ice</div>
        </div>
      </Zoom>
      <div className="download">
        <h6>Download The App</h6>
        <div className="buttons">
          <a
            href="https://sushil.brain.stream/#/icedJuly23"
            target="_blank"
            className="btn-app"
            rel="noopener noreferrer"
          >
            <img src={android} alt="" />
            Android
          </a>
          <div className="space" />
          <div className="btn-app">
            <img src={ios} alt="" />
            IOS
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MobileApps;
