import React, { useEffect, useState } from 'react';
import iceFullLogo from '../../static/images/iceLogoFull.svg';
import moneyMarketLogo from '../../static/images/moneyMarketLogo.svg';
import IceSidebarTransactionList from './IceSidebarTransactionList';
import Axios from 'axios';
import { FormatCurrency } from '../../utils/FunctionTools';
import { Link } from 'react-router-dom';

function IceSidebar() {
  const [earnStats, setEarnStats] = useState({});
  const [globalEarnings, setGlobalEarnings] = useState([]);
  useEffect(() => {
    Axios.get(
      'https://comms.globalxchange.com/coin/iced/interest/logs/get/all'
    ).then((res) => {
      const { data } = res;
      if (data.status) {
        setEarnStats({
          ...data,
          interestLogs: [],
        });
        setGlobalEarnings(data.interestLogs);
      }
    });
  }, []);

  const [menuUserTypes, setMenuUserTypes] = useState(false);
  const [menuAssetTypes, setMenuAssetTypes] = useState(false);
  const [menuBonds, setMenuBonds] = useState(false);

  return (
    <div className="iceSidebar">
      <div className="head">
        <img className="iceLogo" src={iceFullLogo} alt="" />
        <a
          href="https://moneymarkets.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="poweredBy"
        >
          Powered By
          <img src={moneyMarketLogo} alt="" />
        </a>
        <div className="buttons">
          <div
            className="btn-filter"
            onClick={() => {
              setMenuUserTypes(!menuUserTypes);
            }}
          >
            All Users
          </div>
          <div
            className="btn-filter"
            onClick={() => {
              setMenuAssetTypes(!menuAssetTypes);
            }}
          >
            All Asset Types
          </div>
          <div
            className="btn-filter"
            onClick={() => {
              setMenuBonds(!menuBonds);
            }}
          >
            From Bonds
          </div>
        </div>
        {menuUserTypes ? (
          <div className="buttons sub">
            <Link to="/earning" className="btn-filter" onClick={() => {}}>
              Just Me
            </Link>
          </div>
        ) : (
          ''
        )}
        {menuAssetTypes ? (
          <div className="buttons sub">
            <div className="btn-filter" onClick={() => {}}>
              Fiat
            </div>
            <div className="btn-filter" onClick={() => {}}>
              Crypto
            </div>
            <div className="btn-filter" onClick={() => {}}>
              Stablecoins
            </div>
          </div>
        ) : (
          ''
        )}
      </div>

      <div className="payoutsHead">
        <h6>
          Payouts Till Date
          <span>{earnStats.interest_payments}</span>
        </h6>
        <h6>
          Total Earnings
          <span>${FormatCurrency(earnStats.interest_paid)}</span>
        </h6>
        <h6>
          Contracts
          <span>{earnStats.contracts}</span>
        </h6>
        <h6>
          Assets
          <span>{earnStats.assets}</span>
        </h6>
      </div>
      <IceSidebarTransactionList globalEarnings={globalEarnings} />
    </div>
  );
}

export default IceSidebar;
