import React, { useContext, useRef, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import guest from '../static/images/guest.jpg';
import iced from '../static/images/logo.svg';
import card from '../static/images/sidebar-icons/card.svg';
import earnings from '../static/images/sidebar-icons/earnings.svg';
import portfolio from '../static/images/sidebar-icons/portfolio.svg';
import planB from '../static/images/sidebar-icons/planB.svg';
import appstore from '../static/images/sidebar-icons/appstore.svg';
import moneyMarkets from '../static/images/sidebar-icons/moneyMarkets.svg';
import { BankContext } from '../context/Context';
import AssetPriceOrRates from './AssetPriceOrRates';
import { NetWorthContext } from '../context/ NetWorthContext';
import { FormatCurrency } from '../utils/FunctionTools';

function LayoutSidebar({ active }) {
  const history = useHistory();
  const { username, name, profileImg, login } = useContext(BankContext);
  const { totalBalance } = useContext(NetWorthContext);

  const menuEndRef = useRef(null);

  const scrollToBottom = () => {
    if (menuEndRef && menuEndRef.current)
      menuEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (active.includes('transactions')) {
      scrollToBottom();
    }
  }, [active]);

  const [sidebarCollapse, setSidebarCollapse] = useState(false);

  return (
    <div
      className={`side-bar d-flex flex-column ${sidebarCollapse && 'collapse'}`}
    >
      <div className="profile d-flex">
        <img
          src={profileImg ? profileImg : guest}
          alt=""
          onClick={() => setSidebarCollapse(!sidebarCollapse)}
        />
        <div className="col my-auto">
          <h5>{name ? name : username}&nbsp;</h5>
          <div className="getStartedBtn">${FormatCurrency(totalBalance)}</div>
        </div>
        <div className="toolTip">Expand Menu</div>
      </div>
      <Scrollbars
        className="menu-scrl"
        autoHide
        renderTrackHorizontal={() => <div />}
        renderThumbHorizontal={() => <div />}
        renderView={(props) => <div {...props} className="menu-side" />}
      >
        <div className="spacer" />
        <Link
          to="/index"
          className={`menu-itm${active === 'index' ? ' active' : ''}`}
        >
          <h5 className="d-flex py-3 menu-itm">
            <img src={iced} alt="" />
            <span className="my-auto">Index</span>
          </h5>
          <div className="toolTip">Index</div>
        </Link>
        <Link
          to="/moneyMarkets"
          className={`menu-itm${active === 'moneyMarkets' ? ' active' : ''}`}
        >
          <h5 className="d-flex py-3 menu-itm">
            <img src={moneyMarkets} alt="" />
            <span className="my-auto">MoneyMarkets</span>
          </h5>
          <div className="toolTip">MoneyMarkets</div>
        </Link>
        <Link
          to="/"
          className={`menu-itm${active === 'networth' ? ' active' : ''}`}
        >
          <h5 className="d-flex py-3 menu-itm">
            <img src={portfolio} alt="" />
            <span className="my-auto">Assets</span>
          </h5>
          <div className="toolTip">Assets</div>
        </Link>
        <div
          className={`menu-itm${active.includes('vaults') ? ' active' : ''}`}
          onClick={() => {
            history.push('/vault');
          }}
        >
          <h5 className="d-flex py-3 menu-itm">
            <img src={card} alt="" />
            <span className="my-auto">Vaults</span>
          </h5>
          <div className="toolTip">Vaults</div>
        </div>
        <Link
          to="/earning"
          className={`menu-itm${active === 'earn' ? ' active' : ''}`}
        >
          <h5 className="d-flex py-3 menu-itm">
            <img src={earnings} alt="" />
            <span className="my-auto">Fixed Income</span>
          </h5>
          <div className="toolTip">Fixed Income</div>
        </Link>
        <div href="https://planb.assets.io/" className={`menu-itm disable`}>
          <h5 className="d-flex py-3 menu-itm">
            <img src={planB} alt="" />
            <span className="my-auto">PlanB</span>
          </h5>
          <div className="toolTip">PlanB</div>
        </div>
        <Link
          to="/options"
          className={`menu-itm${active === 'Options' ? ' active' : ''}`}
        >
          <h5 className="d-flex py-3 menu-itm">
            <img src={appstore} alt="" />
            <span className="my-auto">Options</span>
          </h5>
          <div className="toolTip">Options</div>
        </Link>
        <Link
          to="/mobile-apps"
          className={`menu-itm${active === 'mobileApps' ? ' active' : ''}`}
        >
          <h5 className="d-flex py-3 menu-itm">
            <img src={appstore} alt="" />
            <span className="my-auto">Mobile Apps</span>
          </h5>
          <div className="toolTip">Mobile Apps</div>
        </Link>
        <div ref={menuEndRef} className="spacer" />
      </Scrollbars>
      <AssetPriceOrRates
        isIndex={active === 'index'}
        setSidebarCollapse={setSidebarCollapse}
      />
      <div
        className="logoutBtn"
        onClick={() => {
          login();
        }}
      >
        <FontAwesomeIcon icon={faLock} />
      </div>
    </div>
  );
}

export default LayoutSidebar;
