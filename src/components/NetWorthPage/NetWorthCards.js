import React, { useContext, useState, useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { FormatCurrency, FormatNumber } from '../../utils/FunctionTools';
import { NetWorthContext } from '../../context/ NetWorthContext';
import { BankContext } from '../../context/Context';

function NetWorthCards() {
  const {
    cardList,
    loadingAppBalance,
    setAssetClass,
    setAssetCoin,
    setLiquidity,
    assetClass,
    assetCoin,
    liquidity,
  } = useContext(NetWorthContext);
  const { coinNameObject } = useContext(BankContext);

  function GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return -1;
      } else if (a[prop] < b[prop]) {
        return 1;
      }
      return 0;
    };
  }

  const [title, setTitle] = useState('Networth By Asset Class');
  useEffect(() => {
    if (liquidity) {
      if (liquidity === 'Liquid') {
        setTitle(
          `Of Liquid ${
            coinNameObject &&
            coinNameObject[assetCoin] &&
            coinNameObject[assetCoin].coinSymbol
          }`
        );
      } else {
        setTitle(
          `Of ${
            coinNameObject &&
            coinNameObject[assetCoin] &&
            coinNameObject[assetCoin].coinSymbol
          } Bonds`
        );
      }
    } else if (assetCoin) {
      setTitle(
        `Of ${
          coinNameObject &&
          coinNameObject[assetCoin] &&
          coinNameObject[assetCoin].coinSymbol
        }  Holdings`
      );
    } else if (assetClass) {
      setTitle(
        `Of ${assetClass === 'Cryptocurrency' ? 'Crypto' : 'Fiat'} Holdings`
      );
    } else {
      setTitle('Of Net-Worth');
    }
  }, [assetClass, assetCoin, liquidity]);

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
      {cardList.sort(GetSortOrder('value')).map((card, i) => (
        <div
          key={`${card.name}${i + assetClass + assetCoin + liquidity}`}
          className={`netWorthCard ${card.type}`}
          onClick={() => {
            if (!loadingAppBalance) {
              if (card.type && card.type === 'asset_class') {
                setAssetClass(card.name);
              }
              if (card.type && card.type === 'coin') {
                setAssetCoin(card.name);
              }
              if (card.type && card.type === 'liquidity') {
                setLiquidity(card.name);
              }
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
              {assetCoin ? (
                <div className="title">
                  <span>
                    {FormatCurrency(
                      card.value / coinNameObject[assetCoin].price.USD,
                      coinNameObject[assetCoin].coinSymbol
                    )}
                  </span>
                  {coinNameObject[assetCoin].coinSymbol}
                </div>
              ) : (
                <div className="title">
                  $ <span>{FormatCurrency(card.value)}</span>USD
                </div>
              )}
            </div>
            <div className="labels">
              <span>
                {!isNaN(card.assets) && FormatNumber(card.assets, 0)}{' '}
                {card.assetText}
              </span>
              <span>
                {assetCoin ? (
                  <b>
                    $ <span>{FormatCurrency(card.value)}</span>USD |{' '}
                  </b>
                ) : (
                  ''
                )}
                Up {FormatNumber(0, 2)}% In 24Hrs
              </span>
            </div>
            <div className="rates">
              <div className="ratesItem text-left">
                <div className="value">
                  <span>
                    {FormatNumber(card.percent, card.percent < 10 ? 2 : 1)}
                  </span>
                  %
                </div>
                <div className="label">% {title}</div>
              </div>
              <div className="ratesItem text-center">
                <div className="value">
                  <span>{FormatNumber(0, 2)}</span>%
                </div>
                <div className="label">Capital Appreciation</div>
              </div>
              <div className="ratesItem text-right">
                <div className="value">
                  <span>{FormatNumber(0, 2)}</span>
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
