import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { BankContext } from '../context/Context';
import LoginWrapper from '../components/LoginModal/LoginWrapper';
import guest from '../static/images/guest.jpg';
import assetsLogo from '../static/images/assetsLogo.svg';

function MobileNavbar({ active }) {
  const [navOpen, setNavOpen] = useState(false);
  const { username, name, profileImg, login, email } = useContext(BankContext);
  const history = useHistory();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [onLoginPage, setOnLoginPage] = useState('');
  const onLogin = () => {
    setLoginModalOpen(false);
    if (onLoginPage) {
      history.push(onLoginPage);
    }
  };

  let title;
  switch (active) {
    case 'index':
      title = 'Index';
      break;
    case 'networth':
      title = 'Net-Worth';
      break;
    case 'vaults-undefined':
      title = 'Vault';
      break;
    case 'vaults-deposit':
      title = 'Deposit';
      break;
    case 'vaults-withdraw':
      title = 'Withdraw';
      break;
    case 'earn':
      title = 'Fixed Income';
      break;
    default:
      break;
  }
  return (
    <>
      <div className="mobile-navbar">
        <div
          onClick={() => setNavOpen(!navOpen)}
          className={
            'd-flex hamburger hamburger--squeeze' +
            (navOpen ? ' is-active' : '')
          }
        >
          <span className="hamburger-box m-auto">
            <span className="hamburger-inner"></span>
          </span>
        </div>
        <div className="title">{title}</div>
        {navOpen ? (
          <div className="menu-open">
            <div className="profile">
              {email ? (
                <img
                  className="proPic"
                  src={profileImg ? profileImg : guest}
                  alt=""
                />
              ) : (
                <img className="logo mt-auto" src={assetsLogo} alt="" />
              )}
              {email ? (
                <div className="user-info">
                  <div className="name">{name ? name : username}</div>
                  <div className="balance">$23, 367.32</div>
                </div>
              ) : (
                <div className="user-info mb-auto">
                  <div className="balance">Assets.io</div>
                </div>
              )}
            </div>
            <div className="menu">
              {email ? (
                <>
                  <Link
                    to="/index"
                    className={`menu-itm ${active === 'index'}`}
                  >
                    Index
                  </Link>
                  <Link to="/" className={`menu-itm ${active === 'networth'}`}>
                    My Net-Worth
                  </Link>
                  <div
                    className={`menu-itm ${active.includes('vaults')}`}
                    onClick={() => {
                      history.push('/vault');
                    }}
                  >
                    Vaults
                  </div>
                  <Link
                    to="/earning"
                    className={`menu-itm ${active === 'earn'}`}
                  >
                    Fixed Income
                  </Link>
                  <Link
                    to="/mobile-apps"
                    className={`menu-itm ${active === 'mobileApps'}`}
                  >
                    Mobile Apps
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/" className={`menu-itm ${active === 'index'}`}>
                    Index
                  </Link>
                  <div
                    onClick={() => {
                      setLoginModalOpen(true);
                      setOnLoginPage('/');
                    }}
                    className={`menu-itm ${active === 'portfolio'}`}
                  >
                    My Net-Worth
                  </div>
                  <Link
                    to="/mobile-apps"
                    className={`menu-itm ${active === 'mobileApps'}`}
                  >
                    Mobile Apps
                  </Link>
                </>
              )}
            </div>
            {email ? (
              <div
                className="logout-btn"
                role="button"
                tabIndex="0"
                onClick={() => login()}
              >
                Logout
              </div>
            ) : (
              <div
                className="logout-btn"
                onClick={() => {
                  setLoginModalOpen(true);
                }}
                role="button"
                tabIndex="0"
              >
                Get Started
              </div>
            )}
          </div>
        ) : (
          ''
        )}
      </div>
      {loginModalOpen ? (
        <LoginWrapper
          onClose={() => {
            console.log('close');
            setLoginModalOpen(false);
            setOnLoginPage();
          }}
          onLogin={onLogin}
        />
      ) : (
        ''
      )}
    </>
  );
}

export default MobileNavbar;
