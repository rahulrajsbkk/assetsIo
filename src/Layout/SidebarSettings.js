import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Scrollbars } from 'react-custom-scrollbars';
import settingsIcon from '../static/images/sidebar-icons/settings.svg';
import selectedIcon from '../static/images/sidebar-icons/selected.svg';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { BankContext } from '../context/Context';

function SidebarSettings({ tabItem, setTabItem, defTab }) {
  const [step, setStep] = useState(0);
  const {
    email,
    login,
    updateInterval,
    setUpdateInterval,
    populateModal,
  } = useContext(BankContext);

  const stepsComponent = [
    <>
      <div className="settingsMenu" onClick={() => setStep(1)}>
        Data Refresh
      </div>
      <div className="settingsMenu">Resize</div>
      <div className="settingsMenu">Time Machine</div>
      {email ? (
        <div
          className="settingsMenu"
          onClick={() => {
            populateModal(
              'Are You Sure To Logout Of This System',
              () => {},
              () => login()
            );
          }}
        >
          Logout
        </div>
      ) : (
        ''
      )}
    </>,
    <>
      <div
        className="settingsMenu"
        onClick={() =>
          populateModal(
            'Confirm Update Of Data Refresh Manually',
            () => {},
            () => setUpdateInterval(0)
          )
        }
      >
        Manual{updateInterval === 0 ? <img src={selectedIcon} alt="" /> : ''}
      </div>
      <div
        className="settingsMenu"
        onClick={() =>
          populateModal(
            'Confirm Update Of Data Refresh Frequency To Ever 5 Seconds',
            () => {},
            () => setUpdateInterval(5)
          )
        }
      >
        5 Seconds{updateInterval === 5 ? <img src={selectedIcon} alt="" /> : ''}
      </div>
      <div
        className="settingsMenu"
        onClick={() =>
          populateModal(
            'Confirm Update Of Data Refresh Frequency To Ever 10 Seconds',
            () => {},
            () => setUpdateInterval(10)
          )
        }
      >
        10 Seconds
        {updateInterval === 10 ? <img src={selectedIcon} alt="" /> : ''}
      </div>
      <div
        className="settingsMenu"
        onClick={() =>
          populateModal(
            'Confirm Update Of Data Refresh Frequency To Ever 15 Seconds',
            () => {},
            () => setUpdateInterval(15)
          )
        }
      >
        15 Seconds
        {updateInterval === 15 ? <img src={selectedIcon} alt="" /> : ''}
      </div>
    </>,
  ];

  const stepTitle = [
    false,
    <div
      className={`tab-itm ${tabItem === 'Interest Rates'}`}
      onClick={() => setStep(0)}
    >
      <FontAwesomeIcon className="backIcon" icon={faAngleLeft} />
      Data Refresh Frequency
    </div>,
  ];

  return (
    <>
      <div className="tab-inrest-asset">
        {stepTitle[step] ? (
          <>{stepTitle[step]}</>
        ) : defTab ? (
          defTab
        ) : (
          <>
            <div
              className={`tab-itm ${tabItem === 'Interest Rates'}`}
              onClick={() => setTabItem('Interest Rates')}
            >
              Liquid Rates
            </div>
            <div
              className={`tab-itm ${tabItem === 'Asset Prices'}`}
              onClick={() => setTabItem('Asset Prices')}
            >
              Asset Prices
            </div>
          </>
        )}
        <div
          className={`tab-itm settings order-2 ${tabItem === 'Settings'}`}
          onClick={() => setTabItem('Settings')}
        >
          <img src={settingsIcon} alt="" />
        </div>
      </div>
      <Scrollbars
        className="rate-list-wrapper settings-wrapper"
        autoHide
        renderTrackHorizontal={() => <div />}
        renderThumbHorizontal={() => <div />}
        renderView={(props) => (
          <div {...props} className="rates-list settings-list" />
        )}
      >
        {stepsComponent[step]}
      </Scrollbars>
    </>
  );
}

export default SidebarSettings;
