import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { BankContext } from '../context/Context';
import LoginWrapper from '../components/LoginModal/LoginWrapper';
import guest from '../static/images/guest.jpg';

function MobileNavbar({ active }) {
  const [navOpen, setNavOpen] = useState(false);
  const { username, name, profileImg, login, email } = useContext(BankContext);
  const [countryName, setCountryName] = useState('');
  useEffect(() => {
    Axios.get('https://ipapi.co/country_name/')
      .then((response) => {
        let data = response.data;
        setCountryName(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
              <img src={profileImg ? profileImg : guest} alt="" />
              <div className="user-info">
                <div className="name">
                  {email ? (name ? name : username) : countryName}&nbsp;
                </div>
                <div className="balance">{email ? '$23, 367.32' : 'Guest'}</div>
              </div>
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
                  <Link
                    to="/net-worth"
                    className={`menu-itm ${active === 'portfolio'}`}
                  >
                    My Net-Worth
                  </Link>
                  <Link
                    to="/vault"
                    className={`menu-itm ${active === 'vaults-undefined'}`}
                  >
                    Transactions
                  </Link>
                  <Link
                    to="/vault/deposit"
                    className={`menu-itm ${active === 'vaults-deposit'}`}
                  >
                    Deposit
                  </Link>
                  <Link
                    to="/vault/withdraw"
                    className={`menu-itm ${active === 'vaults-withdraw'}`}
                  >
                    Withdraw
                  </Link>
                  <div
                    className="logout-btn"
                    role="button"
                    tabIndex="0"
                    onClick={() => login()}
                  >
                    Logout
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/index"
                    className={`menu-itm ${active === 'index'}`}
                  >
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
                  <div
                    onClick={() => {
                      setLoginModalOpen(true);
                      setOnLoginPage('/vault');
                    }}
                    className={`menu-itm ${active === 'vaults-undefined'}`}
                  >
                    Transactions
                  </div>
                  <div
                    onClick={() => {
                      setLoginModalOpen(true);
                      setOnLoginPage('/vault/deposit');
                    }}
                    className={`menu-itm ${active === 'vaults-deposit'}`}
                  >
                    Deposit
                  </div>
                  <div
                    onClick={() => {
                      setLoginModalOpen(true);
                      setOnLoginPage('/vault/withdraw');
                    }}
                    className={`menu-itm ${active === 'vaults-withdraw'}`}
                  >
                    Withdraw
                  </div>
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
                </>
              )}
            </div>
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
