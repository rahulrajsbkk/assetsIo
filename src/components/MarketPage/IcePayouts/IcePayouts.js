import React, { useState, useEffect, useContext } from 'react';
import CountUp from 'react-countup';
import Axios from 'axios';
import iceLogoFull from '../../../static/images/iceLogoFull.svg';
import moneyMarketLogo from '../../../static/images/moneyMarketLogo.svg';
import { BankContext } from '../../../context/Context';
import { Link } from 'react-router-dom';
import IceSidebarTransactionList from '../../IceSidebar/IceSidebarTransactionList';

function IcePayouts() {
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
    <div className="icePayouts">
      <img src={iceLogoFull} alt="" className="logoMain" />
      <div className="poweredBy">
        Powered By
        <img src={moneyMarketLogo} alt="" />
      </div>
      <div className="payoutsHead">
        <div className="item">
          <div className="value">
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
          </div>
          <div className="label">Payouts Till Date</div>
        </div>
        <div className="item">
          <div className="value">
            $
            <CountUp
              duration={duration}
              start={0}
              end={earnStats.interest_paid || 0}
              decimals={2}
            />
          </div>
          <div className="label">Total Earnings</div>
        </div>
        <div className="item">
          <div className="value">
            <CountUp
              duration={duration}
              start={0}
              end={earnStats.contracts || 0}
              decimals={0}
            />
          </div>
          <div className="label">Contracts</div>
        </div>
        <div className="item">
          <div className="value">
            <CountUp
              duration={duration}
              start={0}
              end={earnStats.assets || 0}
              decimals={0}
            />
          </div>
          <div className="label">Assets</div>
        </div>
      </div>
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
      <IceSidebarTransactionList globalEarnings={globalEarnings} />
    </div>
  );
}

export default IcePayouts;
