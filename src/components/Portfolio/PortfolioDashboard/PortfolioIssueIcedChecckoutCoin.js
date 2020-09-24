import React, { useContext } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { FormatCurrency } from '../../../utils/FunctionTools';
import { BankContext } from '../../../context/Context';

function IceSidebarTransactionList({ assetClass, setCoinObj, coinObj }) {
  const { coinList } = useContext(BankContext);
  return (
    <>
      <Scrollbars
        autoHide
        className="coinsListScroll"
        renderThumbHorizontal={() => <div />}
        renderThumbVertical={() => <div />}
        renderView={(props) => <div {...props} className="coinsList" />}
      >
        {coinList
          .filter((coin) => coin.type === assetClass)
          .map((coin) => {
            return (
              <div
                key={coin.coinSymbol}
                className={`coin ${coinObj === {} || coinObj === coin}`}
                onClick={() => setCoinObj(coin)}
              >
                <h6>
                  <img src={coin.coinImage} alt="" />
                  {coin.coinName}
                </h6>
                <h6>{FormatCurrency(coin.coinValue, coin.coinSymbol)}</h6>
              </div>
            );
          })}
      </Scrollbars>
    </>
  );
}

export default IceSidebarTransactionList;
