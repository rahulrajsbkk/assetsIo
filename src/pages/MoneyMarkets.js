/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../Layout/Index';
import moneyMarketLogo from '../static/images/moneyMarketLogoPrimaryColor.svg';
import paste from '../static/images/paste.svg';
import search from '../static/images/search.svg';
import { BankContext } from '../context/Context';

function MoneyMarkets() {
  const { toastShowOn } = useContext(BankContext);
  const [searchStr, setSearch] = useState('');
  const history = useHistory();
  return (
    <Layout active="moneyMarkets" className="moneyMarkets" hideFooter>
      <img src={moneyMarketLogo} className="moneyMarketLogo" alt="" />
      <div className="searchWrapper">
        <input
          type="text"
          value={searchStr}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Any Asset Hash..."
        />
        <img src={paste} alt="" />
        <img
          src={search}
          alt=""
          onClick={() => {
            if (searchStr) history.push(`/bonds/${searchStr}`);
            else toastShowOn('Enter A Valid Asset Hash');
          }}
        />
      </div>
    </Layout>
  );
}

export default MoneyMarkets;
