import React, { useContext, useState } from 'react';
import { OptionsContext } from '../../ContextAPI/OptionContext';
import { Redirect } from 'react-router-dom';
import DepositModal from '../DepositModal.js/DepositModal';
import WithdrawModal from '../WithDrawModal/WithdrawModal';
import TokenLogo from './TokenLogo';
import TerminalLogo from './TerminalLogo';
import { setAppLoginData } from '../../utils';
import LeaderBoardDrawer from '../LeaderBoardDrawer/LeaderBoardDrawer';

function TopNav({ isToken, setIsToken, tab, setTab }) {
  const {
    balance,
    usdAmountFormatter,
    setEmailId,
    email,
    profilePic,
  } = useContext(OptionsContext);
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [fundOpen, setFundOpen] = useState(false);

  const list = [
    // {
    //   name: 'Token 1',
    //   img: TerminalLogo,
    //   key: 'token1',
    // },
    // {
    //   name: 'Token 2',
    //   img: TerminalLogo,
    //   key: 'token2',
    // },
    // {
    //   name: 'Token 3',
    //   img: TerminalLogo,
    //   key: 'token3',
    // },
  ];

  return (
    <>
      <nav className="d-flex opt-top-nav p-0">
        <div
          className={'d-flex brand py-2' + (!isToken ? ' inactive' : '')}
          onClick={() => {
            setIsToken(true);
            setTab('default');
          }}
        >
          <TokenLogo />
          <div className="nav-title">
            <h2>TOKEN</h2>
            <h3>OPTIONS</h3>
          </div>
        </div>
        <div
          className={'d-flex brand py-2' + (isToken ? ' inactive' : '')}
          onClick={() => {
            setIsToken(false);
            setTab('default');
          }}
        >
          <TerminalLogo />
          <div className="nav-title">
            <h2>TERMINAL</h2>
            <h3>VIEW</h3>
          </div>
        </div>
        <div className="d-flex">
          {list.map((item) => {
            return (
              <div
                key={item.key}
                className={'d-flex brand py-2' + (isToken ? ' inactive' : '')}
                onClick={() => setTab(item.key)}
              >
                <i className="close-btn fas fa-times" />

                <item.img />
                <div className="nav-title">
                  <h2>{item.name}</h2>
                  <h3>VIEW</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="add-tab">+</div>
        <div className="search-terminal">
          <input name="search" type="text" placeholder="Search Terminals...|" />
          <label htmlFor="search" className="fas fa-search p-3 my-auto"></label>
        </div>
        <div className="d-flex flex-column opt-balance my-auto p-0 ml-auto">
          <div className="d-flex h-100">
            <img className="icon mx-2" src={profilePic} alt="" />
            <h3 className="my-auto font-weight-bold">
              ${usdAmountFormatter.format(balance)}
            </h3>
            <div className="drop d-flex">
              <i className="fas fa-chevron-down m-auto" />
            </div>
          </div>
          <div className="position-relative">
            <div className="menu-opt flex-column">
              <div
                className="d-flex menu-itm"
                onClick={() => setDepositModalOpen(true)}
              >
                Deposit <span className="navicon-deposit"></span>
              </div>
              <div
                className="d-flex menu-itm"
                onClick={() => setWithdrawModalOpen(true)}
              >
                Withdraw <span className="navicon-withdraw"></span>
              </div>
              <div className="d-flex menu-itm">
                Broker <span className="navicon-broker"></span>
              </div>
              <div
                className="d-flex menu-itm"
                onClick={() => setFundOpen(true)}
              >
                Funds <span className="navicon-funds"></span>
              </div>
              <div
                className="d-flex menu-itm"
                onClick={() => {
                  setAppLoginData('', '', '');
                  setEmailId('');
                }}
              >
                Logout <span className="navicon-logout"></span>
              </div>
            </div>
          </div>
        </div>
        <DepositModal
          modalOpen={depositModalOpen}
          setModalOpen={setDepositModalOpen}
        />
        <WithdrawModal
          modalOpen={withdrawModalOpen}
          setModalOpen={setWithdrawModalOpen}
        />
        <LeaderBoardDrawer drawerOpen={fundOpen} setDrawerOpen={setFundOpen} />
      </nav>
    </>
  );
}

export default TopNav;
