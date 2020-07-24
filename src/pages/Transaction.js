import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faSearch } from '@fortawesome/free-solid-svg-icons';

import Layout from '../Layout/Index';
import btc from '../static/images/coin-small/btc.svg';
import eth from '../static/images/coin-small/eth.svg';
import usdt from '../static/images/coin-small/usdt.svg';

function Transaction({ match }) {
  const [coin, setCoin] = useState('Bitcoin');
  return (
    <Layout
      active={`transactions-${match.params.type}`}
      className="transaction"
    >
      <div className="head">
        <div className="vault-n-balance">
          <div className="vault">{coin} Vault</div>
          <div className="balance">0.03211</div>
        </div>
        <div className="coin-select">
          <div
            className={`coin-wrap ${coin === 'Bitcoin'}`}
            onClick={() => setCoin('Bitcoin')}
          >
            <img src={btc} alt="" />
          </div>
          <div
            className={`coin-wrap ${coin === 'Ethereum'}`}
            onClick={() => setCoin('Ethereum')}
          >
            <img src={eth} alt="" />
          </div>
          <div
            className={`coin-wrap ${coin === 'Tether'}`}
            onClick={() => setCoin('Tether')}
          >
            <img src={usdt} alt="" />
          </div>
        </div>
      </div>
      <div className="controlls">
        <div className="drop-select mr-3">
          All Types
          <FontAwesomeIcon className="ml-2" icon={faCaretDown} />
        </div>
        <div className="drop-select mr-3">
          All Transactions
          <FontAwesomeIcon className="ml-2" icon={faCaretDown} />
        </div>
        <div className="drop-select mr-3">
          All Time
          <FontAwesomeIcon className="ml-2" icon={faCaretDown} />
        </div>
        <div className="search ml-auto">
          <input type="text" name="serch" placeholder="Search Transactions" />
          <FontAwesomeIcon className="ml-2" icon={faSearch} />
        </div>
      </div>

      <Scrollbars
        autoHide
        className="transaction-list"
        renderView={(props) => <div {...props} className="transactions" />}
      >
        <div className="day">Today</div>
        <div className="transaction-itm">
          <img src="" alt="" />
          <div className="name-n-date mr-auto">
            <div className="name">Name Of Transaction</div>
            <div className="date">July 20th 2020 at 9:03 AM EST</div>
          </div>
          <div className="credit">0.0000</div>
          <div className="debit">0.0000</div>
          <div className="balance">0.0000</div>
        </div>
        <div className="transaction-itm">
          <img src="" alt="" />
          <div className="name-n-date mr-auto">
            <div className="name">Name Of Transaction</div>
            <div className="date">July 20th 2020 at 9:03 AM EST</div>
          </div>
          <div className="credit">0.0000</div>
          <div className="debit">0.0000</div>
          <div className="balance">0.0000</div>
        </div>
        <div className="transaction-itm">
          <img src="" alt="" />
          <div className="name-n-date mr-auto">
            <div className="name">Name Of Transaction</div>
            <div className="date">July 20th 2020 at 9:03 AM EST</div>
          </div>
          <div className="credit">0.0000</div>
          <div className="debit">0.0000</div>
          <div className="balance">0.0000</div>
        </div>
        <div className="day">Yesterday</div>
        <div className="transaction-itm">
          <img src="" alt="" />
          <div className="name-n-date mr-auto">
            <div className="name">Name Of Transaction</div>
            <div className="date">July 20th 2020 at 9:03 AM EST</div>
          </div>
          <div className="credit">0.0000</div>
          <div className="debit">0.0000</div>
          <div className="balance">0.0000</div>
        </div>
        <div className="transaction-itm">
          <img src="" alt="" />
          <div className="name-n-date mr-auto">
            <div className="name">Name Of Transaction</div>
            <div className="date">July 20th 2020 at 9:03 AM EST</div>
          </div>
          <div className="credit">0.0000</div>
          <div className="debit">0.0000</div>
          <div className="balance">0.0000</div>
        </div>
        <div className="transaction-itm">
          <img src="" alt="" />
          <div className="name-n-date mr-auto">
            <div className="name">Name Of Transaction</div>
            <div className="date">July 20th 2020 at 9:03 AM EST</div>
          </div>
          <div className="credit">0.0000</div>
          <div className="debit">0.0000</div>
          <div className="balance">0.0000</div>
        </div>
        <div className="day">July 20th 2020</div>
        <div className="transaction-itm">
          <img src="" alt="" />
          <div className="name-n-date mr-auto">
            <div className="name">Name Of Transaction</div>
            <div className="date">July 20th 2020 at 9:03 AM EST</div>
          </div>
          <div className="credit">0.0000</div>
          <div className="debit">0.0000</div>
          <div className="balance">0.0000</div>
        </div>
        <div className="transaction-itm">
          <img src="" alt="" />
          <div className="name-n-date mr-auto">
            <div className="name">Name Of Transaction</div>
            <div className="date">July 20th 2020 at 9:03 AM EST</div>
          </div>
          <div className="credit">0.0000</div>
          <div className="debit">0.0000</div>
          <div className="balance">0.0000</div>
        </div>
        <div className="transaction-itm">
          <img src="" alt="" />
          <div className="name-n-date mr-auto">
            <div className="name">Name Of Transaction</div>
            <div className="date">July 20th 2020 at 9:03 AM EST</div>
          </div>
          <div className="credit">0.0000</div>
          <div className="debit">0.0000</div>
          <div className="balance">0.0000</div>
        </div>
      </Scrollbars>
    </Layout>
  );
}

export default Transaction;
