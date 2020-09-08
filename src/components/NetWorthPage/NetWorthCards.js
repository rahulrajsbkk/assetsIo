import React, { useContext } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { FormatCurrency, FormatNumber } from '../../utils/FunctionTools';
import { NetWorthContext } from '../../context/ NetWorthContext';

function NetWorthCards() {
  const { cardList, setAssetClass, setAssetCoin } = useContext(NetWorthContext);

  return (
    <Scrollbars
      autoHide
      className="netWorthCardsList"
      renderThumbHorizontal={() => <div />}
      renderThumbVertical={() => <div />}
      renderView={(props) => (
        <div {...props} className="netWorthCardsListView" />
      )}
    >
      {cardList.map((card) => (
        <div
          key={card.name}
          className="netWorthCard"
          onClick={() => {
            if (card.type && card.type === 'asset_class') {
              setAssetClass(card.name);
            }
            if (card.type && card.type === 'coin') {
              setAssetCoin(card.name);
            }
          }}
        >
          <div
            className="colorHighlight"
            style={{ background: card.value && card.color }}
          />
          <div className="bondsItem">
            <div className="coinPrice">
              <div className="img">
                {card.img && <img src={card.img} alt="" />}
                {card.name}
              </div>
              <div className="title">
                $ <span>{FormatCurrency(card.value)}</span>USD
              </div>
            </div>
            <div className="labels">
              <span>{FormatNumber(card.assets, 0)} Assets</span>
              <span>Up 2.4% In 24Hrs</span>
            </div>
            <div className="rates">
              <div className="ratesItem text-left">
                <div className="value">
                  <span>{FormatNumber(card.percent, 1)}</span>%
                </div>
                <div className="label">% Of Net-Worth</div>
              </div>
              <div className="ratesItem text-center">
                <div className="value">
                  <span>0.0</span>%
                </div>
                <div className="label">Capital Appreciation</div>
              </div>
              <div className="ratesItem text-right">
                <div className="value">
                  <span>0.00</span>
                </div>
                <div className="label">Fixed Income</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Scrollbars>
  );
}

export default NetWorthCards;
