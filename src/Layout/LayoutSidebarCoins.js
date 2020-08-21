import React, { useContext, useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

import allPlatforms from '../static/images/allPlatforms.svg';
import guest from '../static/images/guest.jpg';
import { BankContext } from '../context/Context';
import LoginWrapper from '../components/LoginModal/LoginWrapper';

function LayoutSidebarCoins({ countryName }) {
  const history = useHistory();
  const {
    email,
    login,
    username,
    name,
    profileImg,
    coinList,
    defaultCoin,
    setDefaultCoin,
    setOpenDefaultCoinSidebar,
    openDefaultCoinSidebar,
  } = useContext(BankContext);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  console.log('coinList', coinList);
  return (
    <>
      <div className="side-bar d-flex flex-column">
        <div className="profile d-flex">
          <img src={profileImg ? profileImg : guest} alt="" />
          <div className="col my-auto">
            <h5>{email ? (name ? name : username) : 'Guest'}&nbsp;</h5>
            <div
              className="currencySelect"
              onClick={() => setOpenDefaultCoinSidebar(!openDefaultCoinSidebar)}
            >
              <img src={defaultCoin.img} alt="" />
              <h6>
                {defaultCoin.name}
                <FontAwesomeIcon icon={faCaretDown} />
              </h6>
            </div>
          </div>
        </div>
        <div className="setNewCurency">Set New Display Currency</div>
        <Scrollbars
          autoHide
          renderView={(props) => <div {...props} className="coins-list" />}
          className="defCoinList"
        >
          <div
            className="coin"
            key="all"
            onClick={() => {
              setDefaultCoin({
                coin: null,
                name: 'Default Coin',
                img: allPlatforms,
              });
              setOpenDefaultCoinSidebar(false);
            }}
          >
            <img className="coin-logo mr-2" src={allPlatforms} alt="" />
            <div className="coin-name">Default Currency</div>
          </div>
          {coinList.map((coin) => (
            <div
              className="coin"
              key={coin.coinName}
              onClick={() => {
                setDefaultCoin({
                  coin: coin.coinSymbol,
                  name: coin.coinName,
                  img: coin.coinImage,
                });
                setOpenDefaultCoinSidebar(false);
              }}
            >
              <img className="coin-logo mr-2" src={coin.coinImage} alt="" />
              <div className="coin-name">{coin.coinName}</div>
            </div>
          ))}
        </Scrollbars>
        {email ? (
          <div
            onClick={() => login()}
            role="button"
            tabIndex="0"
            className="logout"
          >
            <h5>
              <FontAwesomeIcon icon={faLock} className="mr-2" />
              Logout
            </h5>
          </div>
        ) : (
          <div
            onClick={() => {
              setLoginModalOpen(true);
            }}
            role="button"
            tabIndex="0"
            className="logout"
          >
            <h5>Get Started</h5>
          </div>
        )}
      </div>
      {loginModalOpen ? (
        <LoginWrapper
          onClose={() => {
            setLoginModalOpen(false);
          }}
          onLogin={() => {
            setLoginModalOpen(false);
          }}
        />
      ) : (
        ''
      )}
    </>
  );
}

export default LayoutSidebarCoins;
