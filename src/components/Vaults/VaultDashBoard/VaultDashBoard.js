/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useContext } from 'react';
import Lottie from 'react-lottie';

import * as animationData from '../../../static/animations/cpu-loading.json';
import { VaultContext } from '../../../context/VaultContext';
import DashTransaction from './DashTransaction';
import DashContracts from './DashContracts';

function VaultDashBoard() {
  const { loading, dashTab, setDashTab } = useContext(VaultContext);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    className: 'carousel-status',
  };

  const objContent = {
    Dashboard: <DashTransaction />,
    Contracts: <DashContracts />,
  };

  return (
    <div className="vault-dashboard">
      <div className="h-100 dashboard d-flex flex-column">
        <div className="d-flex tab">
          <div
            className={`tab-itm ${dashTab === 'Dashboard' ? 'active' : ''}`}
            onClick={() => setDashTab('Dashboard')}
          >
            <h5>Dashboard</h5>
          </div>
          <div className={`tab-itm ${dashTab === 'Contracts' ? 'active' : ''}`}>
            <h5>Contracts</h5>
          </div>
          <div
            className={`tab-itm ${dashTab === 'Mortgages' ? 'active' : ''}`}
            onClick={() => setDashTab('Mortgages')}
          >
            <h5>Mortgages</h5>
          </div>
          <div
            className={`tab-itm ${dashTab === 'Co-Investing' ? 'active' : ''}`}
            onClick={() => setDashTab('Co-Investing')}
          >
            <h5>Co-Investing</h5>
          </div>
          <div
            className={`tab-itm ${dashTab === 'Profile' ? 'active' : ''}`}
            onClick={() => setDashTab('Profile')}
          >
            <h5>Profile</h5>
          </div>
        </div>
        {loading ? (
          <div className="loading-anim">
            <Lottie
              className="loading-anim"
              options={defaultOptions}
              height={150}
              width={150}
            />
          </div>
        ) : (
          // <>{objContent[dashTab]}</>
          <DashContracts />
        )}
      </div>
    </div>
  );
}

export default VaultDashBoard;
