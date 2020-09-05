import React, { useContext, useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import { VaultContext } from '../../context/VaultContext';
import OnOutsideClick from '../../utils/OnOutsideClick';

function VaultControlls() {
  const {
    loading,
    vaultTxns,
    menuTwo,
    setMenuTwo,
    dateSelected,
    setDateSelected,
  } = useContext(VaultContext);
  const [dateList, setDateList] = useState([]);
  const [searchStr, setSearchStr] = useState('');

  useEffect(() => {
    let dates = [];
    if (vaultTxns[0]) {
      dates.push({
        timestamp: vaultTxns[0].timestamp,
        key: moment(vaultTxns[0].timestamp).format('YYYY MM DD'),
        one: moment(vaultTxns[0].timestamp).format('MMMM Do YYYY'),
        two: moment(vaultTxns[0].timestamp).format('DD/MM/YYYY'),
        three: moment(vaultTxns[0].timestamp).format('DD-MM-YYYY'),
        four: moment(vaultTxns[0].timestamp).format('DD MM YYYY'),
        five: moment(vaultTxns[0].timestamp).format('MMMM D YYYY'),
      });
    }
    for (let i = 1; i < vaultTxns.length; i++) {
      if (
        moment(vaultTxns[i].timestamp).format('YYYY MM DD') !==
        moment(vaultTxns[i - 1].timestamp).format('YYYY MM DD')
      ) {
        dates.push({
          timestamp: vaultTxns[i].timestamp,
          key: moment(vaultTxns[i].timestamp).format('YYYY MM DD'),
          one: moment(vaultTxns[i].timestamp).format('MMMM Do YYYY'),
          two: moment(vaultTxns[i].timestamp).format('DD/MM/YYYY'),
          three: moment(vaultTxns[i].timestamp).format('DD-MM-YYYY'),
          four: moment(vaultTxns[i].timestamp).format('DD MM YYYY'),
          five: moment(vaultTxns[i].timestamp).format('MMMM D YYYY'),
        });
      }
    }
    setDateList(dates);
    console.log('dates', dates);
  }, [vaultTxns]);

  const [menuOne, setMenuOne] = useState({
    key: 'all',
    value: 'All Transaction Types',
  });
  const [menuOneOpen, setMenuOneOpen] = useState(false);
  const menuOneList = [
    {
      key: 'all',
      value: 'All Transaction Types',
    },
    {
      key: 'deposit',
      value: 'Desposits',
    },
    {
      key: 'withdraw',
      value: 'Withdrawals',
    },
    {
      key: 'bondInvest',
      value: 'Bond Investments',
    },
    {
      key: 'bondRepart',
      value: 'Bond Repatriations',
    },
    {
      key: 'bondEarning',
      value: 'Bond Earnings',
    },
    {
      key: 'liquidEarning',
      value: 'Liquid Earnings',
    },
    {
      key: 'trades',
      value: 'Trades',
    },
    {
      key: 'transfers',
      value: 'Transfers',
    },
  ];

  const [menuTwoOpen, setMenuTwoOpen] = useState(false);
  const menuTwoList = [
    {
      key: 'all',
      value: 'All Directions',
    },
    {
      key: 'credit',
      value: 'Credit',
    },
    {
      key: 'debit',
      value: 'Debit',
    },
  ];

  const menuOneRef = useRef();
  const menuTwoRef = useRef();

  OnOutsideClick(menuOneRef, () => setMenuOneOpen(false));
  OnOutsideClick(menuTwoRef, () => setMenuTwoOpen(false));

  return (
    <div className="controlls">
      <div
        className={'drop-select mr-3' + (loading ? ' p-0' : '')}
        ref={menuOneRef}
      >
        <div
          className="content transaction"
          onClick={() => setMenuOneOpen(!menuOneOpen)}
        >
          {loading ? (
            <Skeleton width={230} height={40} />
          ) : (
            <>
              {menuOne.value}
              <FontAwesomeIcon className="ml-2" icon={faCaretDown} />
            </>
          )}
        </div>
        {menuOneOpen ? (
          <div className="menu">
            {menuOneList
              .filter((menu) => menu.key !== menuOne.key)
              .map((menu) => (
                <div
                  key={menu.value}
                  className="menuItem"
                  onClick={() => {
                    setMenuOne(menu);
                    setMenuOneOpen(false);
                  }}
                >
                  {menu.value}
                </div>
              ))}
          </div>
        ) : (
          ''
        )}
      </div>
      <div
        className={'drop-select mr-3' + (loading ? ' p-0' : '')}
        ref={menuTwoRef}
      >
        <div
          className="content direction"
          onClick={() => setMenuTwoOpen(!menuTwoOpen)}
        >
          {loading ? (
            <Skeleton width={140} height={40} />
          ) : (
            <>
              {menuTwo.value}
              <FontAwesomeIcon className="ml-2" icon={faCaretDown} />
            </>
          )}
        </div>
        {menuTwoOpen ? (
          <div className="menu">
            {menuTwoList
              .filter((menu) => menu.key !== menuTwo.key)
              .map((menu) => (
                <div
                  key={menu.value}
                  className="menuItem"
                  onClick={() => {
                    setMenuTwo(menu);
                    setMenuTwoOpen(false);
                  }}
                >
                  {menu.value}
                </div>
              ))}
          </div>
        ) : (
          ''
        )}
      </div>
      <div className={'search ml-auto' + (loading ? ' p-0' : '')}>
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
                  date.three.toLowerCase().includes(searchStr.toLowerCase()) ||
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
  );
}

export default VaultControlls;
