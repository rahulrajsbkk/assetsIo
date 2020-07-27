import React, { useState, useContext } from 'react';
import { BankContext } from '../context/Context';
import { Link } from 'react-router-dom';

function MobileNavbar({ active }) {
  const [navOpen, setNavOpen] = useState(false);
  const { username, name, profileImg, login } = useContext(BankContext);
  console.log('active :>> ', active);
  let title;
  switch (active) {
    case 'portfolio':
      title = 'Portfolio';
      break;
    case 'transactions-undefined':
      title = 'Transactions';
      break;
    case 'transactions-deposit':
      title = 'Deposit';
      break;
    case 'transactions-withdraw':
      title = 'Withdraw';
      break;
    default:
      break;
  }
  return (
    <div className="mobile-navbar">
      <div
        onClick={() => setNavOpen(!navOpen)}
        className={
          'd-flex hamburger hamburger--squeeze' + (navOpen ? ' is-active' : '')
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
            <img
              src={
                profileImg
                  ? profileImg
                  : `https://api.adorable.io/avatars/100/${username}.png`
              }
              alt=""
            />
            <div className="user-info">
              <div className="name">{name ? name : username}&nbsp;</div>
              <div className="balance">$23,367.32</div>
            </div>
          </div>
          <div className="menu">
            <Link to="/" className={`menu-itm ${active === 'portfolio'}`}>
              Portfolio
            </Link>
            <Link
              to="/transactions"
              className={`menu-itm ${active === 'transactions-undefined'}`}
            >
              Transactions
            </Link>
            <Link
              to="/transactions/deposit"
              className={`menu-itm ${active === 'transactions-deposit'}`}
            >
              Deposit
            </Link>
            <Link
              to="/transactions/withdraw"
              className={`menu-itm ${active === 'transactions-withdraw'}`}
            >
              Withdraw
            </Link>
            <div className="logout-btn" onClick={() => login()}>
              Logout
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default MobileNavbar;
