import React, { useContext, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { BankContext } from '../../../../context/Context';

function MainContentCard({ asset }) {
  const { coinList } = useContext(BankContext);
  const [coinSelected, setCoinSelected] = useState({
    coinName: 'US Dollar',
    coinSymbol: 'USD',
  });
  const [searchStr, setSearchStr] = useState('');
  return (
    <div className="card contentCard card-dark">
      <div className="head">
        <div className="titleText">{asset} Markets</div>
      </div>
      <div className="content"></div>
      <div className="footerControlls">
        <div className="valueNSearch">
          <div className="coinNameNValue">
            Liquid {coinSelected && coinSelected.coinName}
            <b>$23.35</b>
          </div>
          <input
            type="text"
            value={searchStr}
            onChange={(e) => setSearchStr(e.target.value)}
            className="coinSearch"
            placeholder="Search Your Vaults"
          />
        </div>
        <Scrollbars
          className="coinListWrap"
          renderThumbHorizontal={() => <div />}
          renderThumbVertical={() => <div />}
          renderView={(props) => <div {...props} className="listView" />}
        >
          {coinList
            .filter(
              (coin) =>
                coin.coinName.toLowerCase().includes(searchStr.toLowerCase()) ||
                coin.coinSymbol.toLowerCase().includes(searchStr.toLowerCase())
            )
            .map((coin) => (
              <img
                key={coin.coinSymbol}
                src={coin.coinImage}
                className={`${
                  coinSelected && coinSelected.coinSymbol === coin.coinSymbol
                }`}
                onClick={() => setCoinSelected(coin)}
              />
            ))}
        </Scrollbars>
      </div>
    </div>
  );
}

export default MainContentCard;
