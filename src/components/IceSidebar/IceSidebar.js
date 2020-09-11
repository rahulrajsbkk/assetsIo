import React, { useEffect, useState, useContext } from 'react';
import iceFullLogo from '../../static/images/iceLogoFull.svg';
import moneyMarketLogo from '../../static/images/moneyMarketLogo.svg';
import IceSidebarTransactionList from './IceSidebarTransactionList';
import Axios from 'axios';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import { BankContext } from '../../context/Context';

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

  const { updateInterval } = useContext(BankContext);
  const [duration, setDuration] = useState(2);
  const togleDuration = (duration) => {
    setDuration(duration === 2 ? 2.1 : 2);
  };

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
        <div
          className={`buttons ${menuUserTypes || menuAssetTypes || menuBonds}`}
        >
          <div
            className="btn-filter"
            onClick={() => {
              setMenuUserTypes(!menuUserTypes);
              setMenuAssetTypes(false);
              setMenuBonds(false);
            }}
          >
            All Users
          </div>
          <div
            className="btn-filter"
            onClick={() => {
              setMenuAssetTypes(!menuAssetTypes);
              setMenuUserTypes(false);
              setMenuBonds(false);
            }}
          >
            All Asset Types
          </div>
          <div
            className="btn-filter"
            onClick={() => {
              setMenuBonds(!menuBonds);
              setMenuAssetTypes(false);
              setMenuUserTypes(false);
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
          <CountUp
            onEnd={() => {
              if (updateInterval)
                setTimeout(() => {
                  togleDuration(duration);
                }, updateInterval * 1000);
            }}
            duration={duration}
            start={0}
            end={earnStats.interest_payments || 0}
            decimals={0}
          />
        </h6>
        <h6>
          Total Earnings
          <span>
            $
            <CountUp
              duration={duration}
              start={0}
              end={earnStats.interest_paid || 0}
              decimals={2}
            />
          </span>
        </h6>
        <h6>
          Contracts
          <CountUp
            duration={duration}
            start={0}
            end={earnStats.contracts || 0}
            decimals={0}
          />
        </h6>
        <h6>
          Assets
          <CountUp
            duration={duration}
            start={0}
            end={earnStats.assets || 0}
            decimals={0}
          />
        </h6>
      </div>
      <IceSidebarTransactionList globalEarnings={globalEarnings} />
    </div>
  );
}

export default IceSidebar;
