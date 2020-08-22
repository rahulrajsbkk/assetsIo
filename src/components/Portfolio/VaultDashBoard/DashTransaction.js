import React, { useState, useRef, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { select, area, curveCardinal } from 'd3';
import DonutChart from '../../DonutChart/Index';
import { PortfolioContext } from '../../../context/PortfolioContext';
import { BankContext } from '../../../context/Context';
import { FormatCurrency, FormatNumber } from '../../../utils/FunctionTools';

const data = [0, 45, 35, 60, 75, 55, 49, 80];
function DashTransaction() {
  const svgRef = useRef();

  const { portfolioSelected, setPortfolioSelected, icedContracts } = useContext(
    PortfolioContext
  );
  const { coinList, email, coinListObject } = useContext(BankContext);

  const [totalLiquid, setTotalLiquid] = useState(0);
  useEffect(() => {
    let totalUsdValue = 0.00000000000000000000000000000000000000001; //To Bypass Divide By Zero Error
    coinList.forEach((coin) => {
      console.log('coin', coin);
      totalUsdValue += coin.coinValueUSD;
    });
    setTotalLiquid(totalUsdValue);
  }, [coinList]);
  console.log('totalLiquid', totalLiquid);
  console.log('coinListObject[BTC]', coinListObject['BTC']);
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

  useEffect(() => {
    const svg = select(svgRef.current);
    const totalWidth = svg._groups[0][0].clientWidth;
    const totalHeight = svg._groups[0][0].clientHeight;
    const maxVal = Math.max(...data);
    const ratio = totalHeight / maxVal;
    const myArea = area()
      .x((value, index) => index * (totalWidth / (data.length - 1)))
      .y0(totalHeight)
      .y1((value) => totalHeight - ratio * value)
      .curve(curveCardinal);

    svg
      .selectAll('path')
      .data([data])
      .join('path')
      .attr('d', (value) => myArea(value))
      .attr('fill', 'url(#grad1)')
      .attr('stroke', 'none');
  }, [totalLiquid, totalPooled]);
  const [segment, setSegment] = useState(null);

  const chartData = [
    {
      value: totalLiquid,
      color: '#464B4E',
      name: 'Liquid',
    },
    {
      value: totalPooled,
      color: '#8B8B8B',
      name: 'Pooled',
    },
  ];

  return (
    <div className="dash-transaction">
      <div className="total-portfolio d-flex">
        <div
          role="button"
          tabIndex="0"
          className="total"
          // onClick={() => setChartData(totalDataChart)}
        >
          <h6>{portfolioSelected} Portfolio</h6>
          <h4>
            $
            {FormatCurrency(
              totalLiquid * (portfolioSelected !== 'Pooled') +
                totalPooled * (portfolioSelected !== 'Liquid')
            )}
          </h4>
        </div>
        <div className="chart-section">
          <div className="chart">
            <div className="chart-name">
              <h6 className="m-auto text-center">
                Total
                <br />
                Vault
              </h6>
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
          <div
            className="cards-list"
            style={{
              position: 'relative',
              overflow: 'hidden',
              width: '80%',
              height: '100%',
            }}
          >
            <div
              className="view"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: 'scroll',
                marginRight: 0,
                marginBottom: 0,
              }}
            >
              <div className="indicator">
                <h6
                  className={`my-3 d-flex ${
                    portfolioSelected === 'Pooled' ? 'inactive' : ''
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
                        (totalLiquid / (totalLiquid + totalPooled)) * 100,
                        1
                      )}
                      )
                    </small>
                  </span>
                </h6>
                <h6
                  className={`my-3 d-flex ${
                    portfolioSelected === 'Liquid' ? 'inactive' : ''
                  }`}
                  onClick={() => {
                    if (portfolioSelected === 'Pooled') {
                      setPortfolioSelected('Total');
                      setSegment(null);
                    } else {
                      setPortfolioSelected('Pooled');
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
                    Pooled&nbsp;
                    <br />
                    <small>
                      (
                      {FormatNumber(
                        (totalPooled / (totalLiquid + totalPooled)) * 100,
                        1
                      )}
                      )
                    </small>
                  </span>
                </h6>
              </div>
            </div>
            <div
              style={{
                position: 'absolute',
                height: 6,
                display: 'none',
                right: 2,
                bottom: 2,
                left: 2,
                borderRadius: 3,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  display: 'block',
                  height: '100%',
                  cursor: 'pointer',
                  borderRadius: 'inherit',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                }}
              />
            </div>
            <div style={{ position: 'absolute', width: 6, display: 'none' }}>
              <div
                style={{
                  position: 'relative',
                  display: 'block',
                  width: '100%',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="chart-area">
        <svg className="chart-curved" ref={svgRef}>
          <defs>
            <linearGradient id="grad1" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop
                offset="0%"
                style={{
                  stopColor: 'rgb(0, 0, 0)',
                  stopOpacity: '0',
                }}
              />
              <stop
                offset="100%"
                style={{
                  stopColor: 'rgb(0, 0, 0)',
                  stopOpacity: 0.2,
                }}
              />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default DashTransaction;
