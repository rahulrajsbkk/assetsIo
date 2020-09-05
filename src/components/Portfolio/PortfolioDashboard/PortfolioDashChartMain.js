import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import * as d3 from 'd3';

import { FormatCurrency, FormatNumber } from '../../../utils/FunctionTools';
import DonutChart from '../../DonutChart/Index';

import assetLogo from '../../../static/images/assetsLogo.svg';
import { PortfolioContext } from '../../../context/PortfolioContext';
import Scrollbars from 'react-custom-scrollbars';

function PortfolioDashChartMain({
  selectedCard,
  setSelectedCard,
  selectedApp,
  setSelectedApp,
}) {
  const {
    portfolioSelected,
    fiatBalance,
    cryptoBalance,
    totalUsdEarning,
    totalUsdContractEarning,
    appBalances,
    userApps,
    coinListObject,
    icedContracts,
  } = useContext(PortfolioContext);

  const [segment, setSegment] = useState(null);

  const [chartData, setChartData] = useState([]);

  const colors = d3.scaleOrdinal(d3.schemeTableau10);

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

  function sortAppBalance() {
    return function (a, b) {
      if (
        selectedCard === 'Cryptocurrency'
          ? appBalances[a.app_code].cryptoBalance >
            appBalances[b.app_code].cryptoBalance
          : appBalances[a.app_code].fiatBalance >
            appBalances[b.app_code].fiatBalance
      ) {
        return -1;
      } else if (
        selectedCard === 'Cryptocurrency'
          ? appBalances[a.app_code].cryptoBalance <
            appBalances[b.app_code].cryptoBalance
          : appBalances[a.app_code].fiatBalance <
            appBalances[b.app_code].fiatBalance
      ) {
        return 1;
      }
      return 0;
    };
  }

  useEffect(() => {
    setTotalSelectedBalance(
      fiatBalance + cryptoBalance + totalUsdEarning + totalUsdContractEarning
    );
    setChartData([
      {
        value: fiatBalance + cryptoBalance + totalUsdEarning || 0,
        color: '#464B4E',
        name: 'Liquid',
      },
      {
        value: totalUsdContractEarning || 0,
        color: '#8B8B8B',
        name: 'Invested',
      },
    ]);
    setSelectedCard(null);
    setSelectedApp(null);
    // eslint-disable-next-line
  }, [fiatBalance, cryptoBalance, totalUsdEarning, totalUsdContractEarning]);

  const [totalSelectedBalance, setTotalSelectedBalance] = useState(0);
  useEffect(() => {
    if (selectedApp) {
      const arr = [];
      Array.prototype.slice
        .call(
          appBalances &&
            appBalances[selectedApp] &&
            appBalances[selectedApp].coins_data.filter((coin) =>
              selectedCard.toLowerCase().includes(coin.type)
            )
        )
        .sort(GetSortOrder('coinValueUSD'))
        .forEach((coin, i) => {
          arr.push({
            value: coin.coinValueUSD,
            color: colors(i),
            name: coin.coinName,
          });
        });
      setChartData(arr);
      setTotalSelectedBalance(
        selectedCard === 'Cryptocurrency'
          ? appBalances[selectedApp].cryptoBalance
          : appBalances[selectedApp].fiatBalance
      );
    } else if (selectedCard) {
      if (
        selectedCard === 'Cryptocurrency' ||
        selectedCard === 'Fiat Currency'
      ) {
        const arr = [];
        Array.prototype.slice
          .call(appBalances && userApps)
          .sort(sortAppBalance())
          .forEach((app, i) => {
            arr.push({
              value:
                selectedCard === 'Cryptocurrency'
                  ? appBalances[app.app_code].cryptoBalance
                  : appBalances[app.app_code].fiatBalance,
              color: colors(i),
              name: app.app_name,
            });
          });
        setChartData(arr);
        setTotalSelectedBalance(
          selectedCard === 'Cryptocurrency' ? cryptoBalance : fiatBalance
        );
      } else if (selectedCard === 'Bonds') {
        const arr = [];
        appBalances &&
          icedContracts.forEach((contract, i) => {
            arr.push({
              value: contract.contracts[0].investment_usd,
              color: colors(i),
              name:
                coinListObject &&
                coinListObject[contract._id] &&
                coinListObject[contract._id].coinName,
            });
          });
        setChartData(arr);
        setTotalSelectedBalance(totalUsdContractEarning);
      } else if (selectedCard === 'Bonds') {
        setChartData([]);
        setTotalSelectedBalance(totalUsdEarning);
      }
    } else {
      setTotalSelectedBalance(
        fiatBalance + cryptoBalance + totalUsdEarning + totalUsdContractEarning
      );
      setChartData([
        {
          value: fiatBalance + cryptoBalance + totalUsdEarning || 0,
          color: '#464B4E',
          name: 'Liquid',
        },
        {
          value: totalUsdContractEarning || 0,
          color: '#8B8B8B',
          name: 'Invested',
        },
      ]);
    }
    // eslint-disable-next-line
  }, [selectedApp, selectedCard]);

  return (
    <div className="chartSection">
      <div role="button" tabIndex="0" className="total">
        {portfolioSelected === 'Total' ? (
          <>
            <h6>Your Net-Worth</h6>
            <h4>${FormatCurrency(totalSelectedBalance)}</h4>
          </>
        ) : (
          <>
            <h6>{portfolioSelected} Portfolio</h6>
            <h4>
              $
              {FormatCurrency(
                (fiatBalance + cryptoBalance + totalUsdEarning) *
                  (portfolioSelected !== 'Invested') +
                  totalUsdContractEarning * (portfolioSelected !== 'Liquid')
              )}
            </h4>
          </>
        )}
      </div>
      <div className="chart-section">
        <div
          className="chart"
          onClick={() => {
            if (selectedCard && selectedApp) {
              setSelectedApp(null);
            } else {
              setSelectedCard(null);
            }
          }}
        >
          <div className="chartLogo">
            <img src={assetLogo} alt="" />
          </div>
          <DonutChart
            pieData={chartData}
            onMouseOver={(segmentIndex) => {
              if (portfolioSelected === 'Total') setSegment(segmentIndex);
            }}
            onMouseOut={() => {
              if (portfolioSelected === 'Total') setSegment(null);
            }}
            segment={segment}
          />
        </div>
        <Scrollbars
          className="cards-list"
          renderView={(props) => <div {...props} className="view" />}
        >
          {chartData.map((data) => (
            <h6 className={`my-3 d-flex`}>
              <FontAwesomeIcon
                className="my-auto"
                icon={faDotCircle}
                style={{ color: data.color }}
              />
              <span className="m-0">
                {data.name}&nbsp;
                <br />
                <small>
                  (
                  {FormatNumber(
                    (data.value / totalSelectedBalance) * 100,
                    (data.value / totalSelectedBalance) * 100 < 10 ? 2 : 1
                  )}{' '}
                  %)
                </small>
              </span>
            </h6>
          ))}
        </Scrollbars>
      </div>
    </div>
  );
}

export default PortfolioDashChartMain;
