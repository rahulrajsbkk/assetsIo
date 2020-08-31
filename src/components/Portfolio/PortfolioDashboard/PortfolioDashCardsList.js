import React, { useContext, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import Skeleton from 'react-loading-skeleton';
import CountUp from 'react-countup';
import { PortfolioContext } from '../../../context/PortfolioContext';
import { FormatCurrency } from '../../../utils/FunctionTools';
import { BankContext } from '../../../context/Context';
import logo from '../../../static/images/logoWtBg.svg';

function PortfolioDashCardsList({
  selectedCard,
  setSelectedCard,
  selectedApp,
  setSelectedApp,
}) {
  const {
    fiatBalance,
    cryptoBalance,
    userApps,
    appBalances,
    loadingAppBalance,
    loadingEarnings,
    totalUsdEarning,
    totalUsdContractEarning,
    loadingBondEarnings,
  } = useContext(PortfolioContext);
  const { updateInterval } = useContext(BankContext);
  const [duration, setDuration] = useState(2);
  const togleDuration = (duration) => {
    setDuration(duration === 2 ? 2.1 : 2);
  };
  if (selectedApp)
    return (
      <div className="cardsSection detail">
        <h3>{selectedCard}</h3>
        <h6>Here Are All Your Balances For {selectedApp}</h6>
        <Scrollbars
          className="vaultList"
          autoHide
          renderTrackHorizontal={() => <div />}
          renderThumbHorizontal={() => <div />}
          renderView={(props) => <div {...props} className="vault-list" />}
        >
          {appBalances &&
            appBalances[selectedApp] &&
            appBalances[selectedApp].coins_data
              .filter((coin) => selectedCard.toLowerCase().includes(coin.type))
              .map((coin) => (
                <div className="coin" key={coin.coinSymbol}>
                  <img className="coin-logo mr-2" src={coin.coinImage} alt="" />
                  <div className="coin-name">{coin.coinName}</div>
                  <div className="rate">
                    {loadingAppBalance ? (
                      <Skeleton height="100%" width={80} />
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                </div>
              ))}
        </Scrollbars>
      </div>
    );
  if (selectedCard)
    return (
      <div className="cardsSection detail">
        <h3>{selectedCard}</h3>
        <h6>Here Are All Your Vaults</h6>
        {selectedCard === 'Cryptocurrency' ||
        selectedCard === 'Fiat Currency' ? (
          <Scrollbars
            className="vaultList"
            autoHide
            renderTrackHorizontal={() => <div />}
            renderThumbHorizontal={() => <div />}
            renderView={(props) => <div {...props} className="vault-list" />}
          >
            {appBalances &&
              userApps.map((app) => (
                <div
                  className="coin"
                  key={app.app_code}
                  onClick={() => setSelectedApp(app.app_code)}
                >
                  <img className="coin-logo mr-2" src={logo} alt="" />
                  <div className="coin-name">{app.app_code}</div>
                  <div className="rate">
                    {loadingAppBalance || !appBalances[app.app_code] ? (
                      <Skeleton height="100%" width={80} />
                    ) : (
                      <>
                        $
                        <CountUp
                          onEnd={() => {
                            if (updateInterval)
                              setTimeout(() => {
                                togleDuration(duration);
                              }, updateInterval * 1000);
                          }}
                          duration={duration}
                          end={
                            selectedCard === 'Cryptocurrency'
                              ? appBalances[app.app_code].cryptoBalance
                              : appBalances[app.app_code].fiatBalance
                          }
                          decimals={2}
                        />
                      </>
                    )}
                  </div>
                </div>
              ))}
          </Scrollbars>
        ) : (
          ''
        )}{' '}
      </div>
    );
  return (
    <div className="cardsSection">
      <div
        className="indexCard"
        onClick={() => setSelectedCard('Cryptocurrency')}
      >
        <div className="name">Liquid Crypto</div>
        <div className="value">
          {loadingAppBalance ? (
            <Skeleton height="100%" width={180} />
          ) : (
            `$${FormatCurrency(cryptoBalance)} USD`
          )}
        </div>
      </div>
      <div
        className="indexCard"
        onClick={() => setSelectedCard('Fiat Currency')}
      >
        <div className="name">Fiat Currency</div>
        <div className="value">
          {loadingAppBalance ? (
            <Skeleton height="100%" width={180} />
          ) : (
            `$${FormatCurrency(fiatBalance)} USD`
          )}
        </div>
      </div>
      <div className="indexCard" onClick={() => setSelectedCard('Bonds')}>
        <div className="name">Bonds</div>
        <div className="value">
          {loadingBondEarnings ? (
            <Skeleton height="100%" width={180} />
          ) : (
            `$${FormatCurrency(totalUsdContractEarning)} USD`
          )}
        </div>
      </div>
      <div
        className="indexCard"
        onClick={() => setSelectedCard('Fixed Income')}
      >
        <div className="name">Fixed Income</div>
        <div className="value">
          {loadingEarnings ? (
            <Skeleton height="100%" width={180} />
          ) : (
            `$${FormatCurrency(totalUsdEarning)} USD`
          )}
        </div>
      </div>
      <div className="indexCard">
        <div className="name">Digital Assets</div>
        <div className="value">Coming Soon</div>
      </div>
    </div>
  );
}

export default PortfolioDashCardsList;
