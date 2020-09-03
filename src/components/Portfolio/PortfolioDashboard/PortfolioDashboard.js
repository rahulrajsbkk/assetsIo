import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { FormatCurrency, FormatNumber } from '../../../utils/FunctionTools';
import DonutChart from '../../DonutChart/Index';
import { PortfolioContext } from '../../../context/PortfolioContext';
import { BankContext } from '../../../context/Context';
import assetLogo from '../../../static/images/assetsLogo.svg';
import PortfolioDashCardsList from './PortfolioDashCardsList';
import PortfolioGrowAssets from './PortfolioGrowAssets';
import PortfolioAssets from './PortfolioAssets';
import PortfolioSetDays from './PortfolioSetDays';

function PortfolioDashboard() {
  const {
    portfolioSelected,
    setPortfolioSelected,
    icedContracts,
    fiatBalance,
    cryptoBalance,
    totalUsdEarning,
    totalUsdContractEarning,
    dashTab,
    setDashTab,
    icingStep,
  } = useContext(PortfolioContext);
  const { coinList, email, coinListObject } = useContext(BankContext);

  const [totalLiquid, setTotalLiquid] = useState(0);
  useEffect(() => {
    let totalUsdValue = 0.00000000000000000000000000000000000000001; //To Bypass Divide By Zero Error
    coinList.forEach((coin) => {
      totalUsdValue += coin.coinValueUSD;
    });
    setTotalLiquid(totalUsdValue);
  }, [coinList]);
  const [totalPooled, setTotalPooled] = useState(0);
  useEffect(() => {
    let totalUsdValue = 0.00000000000000000000000000000000000000001; //To Bypass Divide By Zero Error
    icedContracts.forEach((coin) => {
      if (
        coinListObject &&
        coinListObject[coin._id] &&
        coinListObject[coin._id].price &&
        coinListObject[coin._id].price.USD
      ) {
        totalUsdValue +=
          coin.contract_amount * coinListObject[coin._id].price.USD;
      }
    });
    setTotalPooled(totalUsdValue);
  }, [icedContracts, coinListObject, email]);

  const [segment, setSegment] = useState(null);

  const chartData = [
    {
      value: fiatBalance + cryptoBalance + totalUsdEarning,
      color: '#464B4E',
      name: 'Liquid',
    },
    {
      value: totalUsdContractEarning,
      color: '#8B8B8B',
      name: 'Invested',
    },
  ];

  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);

  const icingAssetSteps = [
    <PortfolioAssets />,
    <PortfolioSetDays />,
    <div className="flex-grow-1" />,
  ];

  const getDashContent = () => {
    switch (dashTab) {
      case 'Assets':
        return icingAssetSteps[icingStep];
      default:
        return (
          <div className="chartNCards">
            <div className="chartSection">
              <div
                role="button"
                tabIndex="0"
                className="total"
                // onClick={() => setChartData(totalDataChart)}
              >
                {portfolioSelected === 'Total' ? (
                  <>
                    <h6>Your Net-Worth</h6>
                    <h4>
                      $
                      {FormatCurrency(
                        fiatBalance +
                          cryptoBalance +
                          totalUsdEarning +
                          totalUsdContractEarning
                      )}
                    </h4>
                  </>
                ) : (
                  <>
                    <h6>{portfolioSelected} Portfolio</h6>
                    <h4>
                      $
                      {FormatCurrency(
                        (fiatBalance + cryptoBalance + totalUsdEarning) *
                          (portfolioSelected !== 'Invested') +
                          totalUsdContractEarning *
                            (portfolioSelected !== 'Liquid')
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
                      if (portfolioSelected === 'Total')
                        setSegment(segmentIndex);
                    }}
                    onMouseOut={() => {
                      if (portfolioSelected === 'Total') setSegment(null);
                    }}
                    segment={segment}
                  />
                </div>
                <div className="cards-list d-flex">
                  <div className="view my-auto">
                    <div className="indicator">
                      <h6
                        className={`my-3 d-flex ${
                          portfolioSelected === 'Invested' ? 'inactive' : ''
                        }`}
                        onClick={() => {
                          if (portfolioSelected === 'Liquid') {
                            setPortfolioSelected('Total');
                            setSegment(null);
                          } else {
                            setPortfolioSelected('Liquid');
                            setSegment(0);
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          className="my-auto"
                          icon={faDotCircle}
                          style={{ color: '#464B4E' }}
                        />
                        <span className="m-0">
                          Liquid&nbsp;
                          <br />
                          <small>
                            (
                            {FormatNumber(
                              ((fiatBalance + cryptoBalance + totalUsdEarning) /
                                (fiatBalance +
                                  cryptoBalance +
                                  totalUsdEarning +
                                  totalUsdContractEarning)) *
                                100,
                              ((fiatBalance + cryptoBalance + totalUsdEarning) /
                                (fiatBalance +
                                  cryptoBalance +
                                  totalUsdEarning +
                                  totalUsdContractEarning)) *
                                100 <
                                10
                                ? 2
                                : 1
                            )}
                            %)
                          </small>
                        </span>
                      </h6>
                      <h6
                        className={`my-3 d-flex ${
                          portfolioSelected === 'Liquid' ? 'inactive' : ''
                        }`}
                        onClick={() => {
                          if (portfolioSelected === 'Invested') {
                            setPortfolioSelected('Total');
                            setSegment(null);
                          } else {
                            setPortfolioSelected('Invested');
                            setSegment(1);
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          className="my-auto"
                          icon={faDotCircle}
                          style={{ color: '#8B8B8B' }}
                        />
                        <span className="m-0">
                          Invested&nbsp;
                          <br />
                          <small>
                            (
                            {FormatNumber(
                              (totalUsdContractEarning /
                                (fiatBalance +
                                  cryptoBalance +
                                  totalUsdEarning +
                                  totalUsdContractEarning)) *
                                100,
                              (totalUsdContractEarning /
                                (fiatBalance +
                                  cryptoBalance +
                                  totalUsdEarning +
                                  totalUsdContractEarning)) *
                                100 <
                                10
                                ? 2
                                : 1
                            )}
                            %)
                          </small>
                        </span>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <PortfolioDashCardsList
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
              selectedApp={selectedApp}
              setSelectedApp={setSelectedApp}
            />
          </div>
        );
    }
  };
  return (
    <div className="portfolioDashboard">
      <div className="tab">
        <div
          className={`tab-itm ${dashTab === 'Net-Worth' ? 'active' : ''}`}
          onClick={() => setDashTab('Net-Worth')}
        >
          <h5>Net-Worth</h5>
        </div>
        <div
          className={`tab-itm ${dashTab === 'Assets' ? 'active' : ''}`}
          onClick={() => {}}
        >
          <h5>Assets</h5>
        </div>
        <div className={`tab-itm ${dashTab === 'Mortgages' ? 'active' : ''}`}>
          <h5>Mortgages</h5>
        </div>
        <div
          className={`tab-itm ${dashTab === 'Co-Investing' ? 'active' : ''}`}
        >
          <h5>Co-Investing</h5>
        </div>
        <div className={`tab-itm ${dashTab === 'Funds' ? 'active' : ''}`}>
          <h5>Funds</h5>
        </div>
      </div>
      {getDashContent()}
      <PortfolioGrowAssets />
    </div>
  );
}

export default PortfolioDashboard;
