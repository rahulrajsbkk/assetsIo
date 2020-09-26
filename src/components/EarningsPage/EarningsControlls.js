import React, { useContext, useState, useEffect, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faTimes,
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import { EarningsContext } from '../../context/EarningsContext';
import assetLogo from '../../static/images/assetsLogo.svg';
import OnOutsideClick from '../../utils/OnOutsideClick';

function EarningsControlls({ openSelectApp, setOpenSelectApp }) {
  const {
    loading,
    earnTransactions,
    dateSelected,
    setDateSelected,
    liquidOrBond,
    setLiquidOrBond,
    userApps,
    appSelected,
    setAppSelected,
  } = useContext(EarningsContext);
  const [dateList, setDateList] = useState([]);
  const [searchStr, setSearchStr] = useState('');
  const ref = useRef();
  OnOutsideClick(ref, () => setOpenSelectApp(false));
  useEffect(() => {
    let dates = [];
    if (earnTransactions[0]) {
      dates.push({
        timestamp: earnTransactions[0].timestamp,
        key: moment(earnTransactions[0].timestamp).format('YYYY MM DD'),
        one: moment(earnTransactions[0].timestamp).format('MMMM Do YYYY'),
        two: moment(earnTransactions[0].timestamp).format('DD/MM/YYYY'),
        three: moment(earnTransactions[0].timestamp).format('DD-MM-YYYY'),
        four: moment(earnTransactions[0].timestamp).format('DD MM YYYY'),
        five: moment(earnTransactions[0].timestamp).format('MMMM D YYYY'),
      });
    }
    for (let i = 1; i < earnTransactions.length; i++) {
      if (
        moment(earnTransactions[i].timestamp).format('YYYY MM DD') !==
        moment(earnTransactions[i - 1].timestamp).format('YYYY MM DD')
      ) {
        dates.push({
          timestamp: earnTransactions[i].timestamp,
          key: moment(earnTransactions[i].timestamp).format('YYYY MM DD'),
          one: moment(earnTransactions[i].timestamp).format('MMMM Do YYYY'),
          two: moment(earnTransactions[i].timestamp).format('DD/MM/YYYY'),
          three: moment(earnTransactions[i].timestamp).format('DD-MM-YYYY'),
          four: moment(earnTransactions[i].timestamp).format('DD MM YYYY'),
          five: moment(earnTransactions[i].timestamp).format('MMMM D YYYY'),
        });
      }
    }
    setDateList(dates);
  }, [earnTransactions]);

  return (
    <div ref={ref}>
      <div className="controlls">
        <div
          className={`drop-select liquid ${liquidOrBond === 'Liquid'} ${
            loading ? ' p-0' : ''
          }`}
          onClick={() => {
            setLiquidOrBond('Liquid');
            setOpenSelectApp(false);
          }}
        >
          <div className="content">
            {loading ? <Skeleton width={230} height={40} /> : <>Liquid</>}
          </div>
        </div>
        <div
          className={`drop-select bond ${liquidOrBond === 'Bond'} ${
            loading ? ' p-0' : ''
          }`}
          onClick={() => {
            setLiquidOrBond('Bond');
            setOpenSelectApp(false);
          }}
        >
          <div className="content">
            {loading ? <Skeleton width={140} height={40} /> : <>Bonds</>}
          </div>
        </div>

        <div
          className={`drop-select ml-4 ${loading ? ' p-0' : ''}`}
          onClick={() => {
            setOpenSelectApp(!openSelectApp);
          }}
        >
          <div className="content">
            {loading ? (
              <Skeleton width={140} height={40} />
            ) : (
              <>
                {`Earnings From ${
                  (appSelected && appSelected.app_name) || 'All'
                } Vaults`}
                <FontAwesomeIcon
                  className="ml-4"
                  icon={openSelectApp ? faCaretUp : faCaretDown}
                />
              </>
            )}
          </div>
        </div>

        <div
          onClick={() => setOpenSelectApp(false)}
          className={'search ml-auto' + (loading ? ' p-0' : '')}
        >
          <div className="content">
            {loading ? (
              <Skeleton width={200} height={40} />
            ) : (
              <>
                {dateSelected ? (
                  <input type="text" value={dateSelected.one} readOnly />
                ) : (
                  <input
                    type="text"
                    name="search"
                    value={searchStr}
                    onChange={(e) => setSearchStr(e.target.value)}
                    placeholder="Search Date"
                  />
                )}
                <FontAwesomeIcon
                  onClick={() => setDateSelected(null)}
                  className="ml-2"
                  icon={dateSelected ? faTimes : faSearch}
                />
              </>
            )}
          </div>
          {searchStr ? (
            <div className="menu">
              {dateList
                .filter(
                  (date) =>
                    date.key.toLowerCase().includes(searchStr.toLowerCase()) ||
                    date.one.toLowerCase().includes(searchStr.toLowerCase()) ||
                    date.two.toLowerCase().includes(searchStr.toLowerCase()) ||
                    date.three
                      .toLowerCase()
                      .includes(searchStr.toLowerCase()) ||
                    date.four.toLowerCase().includes(searchStr.toLowerCase()) ||
                    date.five.toLowerCase().includes(searchStr.toLowerCase())
                )
                .map((date) => (
                  <div
                    key={date.one}
                    className="menuItem"
                    onClick={() => {
                      setDateSelected(date);
                      setSearchStr('');
                    }}
                  >
                    {date.one}
                  </div>
                ))}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      {openSelectApp && liquidOrBond === 'Liquid' ? (
        <Scrollbars
          className="assetApps"
          renderThumbHorizontal={() => <div style={{ opacity: 0 }} />}
          renderThumbVertical={() => <div style={{ opacity: 0 }} />}
          renderView={(props) => <div {...props} className="view" />}
        >
          <div className="d-flex" onClick={() => setOpenSelectApp(false)}>
            <div
              className={`appIcon ${appSelected === null}`}
              onClick={() => setAppSelected(null)}
            >
              A<div className="appTooltip">All</div>
            </div>
            {userApps.map((app) => (
              <div
                key={app.app_code}
                className={`appIcon ${
                  appSelected && appSelected.app_code === app.app_code
                }`}
                onClick={() => setAppSelected(app)}
              >
                <img src={app.app_icon || assetLogo} alt="" />
                <div className="appTooltip">{app.app_name}</div>
              </div>
            ))}
          </div>
        </Scrollbars>
      ) : (
        ''
      )}
    </div>
  );
}

export default EarningsControlls;
