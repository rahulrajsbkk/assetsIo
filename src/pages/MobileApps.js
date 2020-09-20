import React, { useEffect, useState } from 'react';
import Zoom from 'react-reveal/Zoom';
import Layout from '../Layout/Index';
import logo from '../static/images/logoWtBg.svg';
import android from '../static/images/android.svg';
import ios from '../static/images/ios.svg';
import Axios from 'axios';

function MobileApps() {
  const [appLinks, setAppLinks] = useState({});
  useEffect(() => {
    Axios.get(
      'https://storeapi.apimachine.com/dynamic/Globalxchangetoken/applinks?key=4c69ba17-af5c-4a5c-a495-9a762aba1142'
    ).then((res) => {
      const { data } = res;
      if (data.success) {
        setAppLinks(data.data.filter((app) => app.Key === 'ice')[0].formData);
      }
    });
  }, []);
  return (
    <Layout active="mobileApps" className="mobileApps">
      <Zoom>
        <div className="logo-n-title">
          <img className="logo" src={logo} alt="" />
          <div className="title">Assets.io</div>
          <p className="subTitle">
            {/* Please Download The Mobile App For The Best User Experience. */}
            Coming Soon To
          </p>
        </div>
      </Zoom>
      <div className="download">
        <h6>
          {/* Download The App */}
          Coming Soon To
        </h6>
        <div className="buttons">
          <div
            href={`https://${appLinks.androidlink}`}
            target="_blank"
            className="btn-app disable"
            rel="noopener noreferrer"
          >
            <img src={android} alt="" />
            Android
          </div>
          <div className="space" />
          <div
            href={`https://${appLinks.ioslink}`}
            target="_blank"
            className="btn-app disable"
            rel="noopener noreferrer"
          >
            <img src={ios} alt="" />
            IOS
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MobileApps;
