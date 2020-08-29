import React, { useContext, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { PortfolioContext } from '../../../context/PortfolioContext';
import { FormatCurrency } from '../../../utils/FunctionTools';
import { BankContext } from '../../../context/Context';
import CountUp from 'react-countup';

function PortfolioDashCardsList({ selectedCard, setSelectedCard }) {
  const { fiatBalance, cryptoBalance, coinBalanceList } = useContext(
    PortfolioContext
  );
  const { updateInterval } = useContext(BankContext);
  const [duration, setDuration] = useState(2);
  const togleDuration = (duration) => {
    setDuration(duration === 2 ? 2.1 : 2);
  };
  if (selectedCard)
    return (
      <div className="cardsSection detail">
        <h3>{selectedCard}</h3>
        <h6>Here Are All Your Vaults</h6>
        <Scrollbars
          className="vaultList"
          autoHide
          renderTrackHorizontal={() => <div />}
          renderThumbHorizontal={() => <div />}
          renderView={(props) => <div {...props} className="vault-list" />}
        >
          {coinBalanceList
            .filter((coin) => selectedCard.toLowerCase().includes(coin.type))
            .map((coin) => (
              <div className="coin" key={coin.coinSymbol}>
                <img className="coin-logo mr-2" src={coin.coinImage} alt="" />
                <div className="coin-name">{coin.coinName}</div>
                <div className="rate">
                  $
                  <CountUp
                    onEnd={() => {
                      if (updateInterval)
                        setTimeout(() => {
                          togleDuration(duration);
                        }, updateInterval * 1000);
                    }}
                    duration={duration}
                    end={coin.coinValueUSD}
                    decimals={2}
                  />
                </div>
              </div>
            ))}
        </Scrollbars>
      </div>
    );
  return (
    <div className="cardsSection">
      <div
        className="indexCard"
        onClick={() => setSelectedCard('Cryptocurrency')}
      >
        <div className="name">Liquid Crypto</div>
        <div className="value">${FormatCurrency(cryptoBalance)} USD</div>
      </div>
      <div
        className="indexCard"
        onClick={() => setSelectedCard('Fiat Currency')}
      >
        <div className="name">Fiat Currency</div>
        <div className="value">${FormatCurrency(fiatBalance)} USD</div>
      </div>
      <div className="indexCard" onClick={() => setSelectedCard('Bonds')}>
        <div className="name">Bonds</div>
        <div className="value">$_ USD</div>
      </div>
      <div
        className="indexCard"
        onClick={() => setSelectedCard('Fixed Income')}
      >
        <div className="name">Fixed Income</div>
        <div className="value">$_ USD</div>
      </div>
      <div className="indexCard">
        <div className="name">Digital Assets</div>
        <div className="value">Coming Soon</div>
      </div>
    </div>
  );
}

export default PortfolioDashCardsList;
