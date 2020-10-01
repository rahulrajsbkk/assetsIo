/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Layout from '../Layout/Index';
import { BankContext } from '../context/Context';
import moneyMarketLogo from '../static/images/moneyMarketLogoPrimaryColor.svg';
import paste from '../static/images/paste.svg';
import search from '../static/images/search.svg';

function MoneyMarkets() {
  const [searchStr, setSearch] = useState('');
  const { email } = useContext(BankContext);
  const history = useHistory();
  if (!email) {
    return <Redirect to="/" />;
  }
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
            history.push(`/bonds/${searchStr}`);
          }}
        />
      </div>
    </Layout>
  );
}

export default MoneyMarkets;
