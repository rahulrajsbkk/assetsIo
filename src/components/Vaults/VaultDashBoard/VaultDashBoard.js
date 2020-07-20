/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';
import DonutChart from '../../DonutChart/Index';

function VaultDashBoard() {
  const [segment, setSegment] = useState(null);

  const totalDataChart = [
    {
      value: 1,
      color: '#002A51',
      name: 'Liquid',
    },
    {
      value: 1,
      color: '#8B8B8B',
      name: 'Pooled',
    },
  ];
  const liquidDataChart = [
    {
      value: 1,
      color: '#002A51',
      name: 'Liquid',
    },
  ];

  const pooledDataChart = [
    {
      value: 1,
      color: '#8B8B8B',
      name: 'Pooled',
    },
  ];

  const [chartData, setChartData] = useState(totalDataChart);
  console.log('chartData', chartData);

  return (
    <div className="vault-dashboard p-3">
      <div className="card h-100 dashboard d-flex flex-column">
        <div className="d-flex tab">
          <div className="tab-itm active">
            <h5>Dashboard</h5>
          </div>
          <div className="tab-itm">
            <h5>Lotteries</h5>
          </div>
          <div className="tab-itm">
            <h5>Deposits</h5>
          </div>
          <div className="tab-itm">
            <h5>Withdrawals</h5>
          </div>
          <div className="tab-itm ant-dropdown-trigger">
            <h5 className="mr-0" style={{ whiteSpace: 'nowrap' }}>
              Closed Lotteries
            </h5>
            <h5 className="mx-0 px-1">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="caret-down"
                className="svg-inline--fa fa-caret-down fa-w-10 "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                />
              </svg>
            </h5>
          </div>
        </div>
        <div className="dash-home">
          <div className="head d-flex">
            <div
              role="button"
              tabIndex="0"
              className={`col-6 total ${
                chartData === totalDataChart ? 'active' : ''
              }`}
              onClick={() => setChartData(totalDataChart)}
            >
              <h6>Total</h6>
              <h4>$1,606.00</h4>
            </div>
            <div className="col-6 detail">
              <div
                role="button"
                tabIndex="0"
                className={`liquid ${
                  chartData === liquidDataChart ? 'active' : ''
                }`}
                onClick={() => setChartData(liquidDataChart)}
              >
                <h6>Liquid</h6>
                <h3>$1,606.00</h3>
              </div>
              <div
                role="button"
                tabIndex="0"
                className={`pooled ${
                  chartData === liquidDataChart ? 'active' : ''
                }`}
                onClick={() => setChartData(pooledDataChart)}
              >
                <h6>Pooled</h6>
                <h3>$0.00</h3>
              </div>
            </div>
          </div>
          <div className="chart-section">
            <div className="col-6 p-0 d-flex">
              <div className="chart">
                <div className="chart-name">
                  <h6 className="m-auto text-center">
                    Bitcoin
                    <br />
                    Vault
                  </h6>
                </div>
                <DonutChart
                  pieData={chartData}
                  onMouseOver={(segmentIndex) => {
                    setSegment(segmentIndex);
                  }}
                  onMouseOut={() => {
                    setSegment(null);
                  }}
                  segment={segment}
                />
              </div>
            </div>
            <div className="col-6 d-flex">
              <div
                className="cards-list"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  width: '100%',
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
                    <h6 className="my-4">
                      <svg
                        className="svg-inline--fa fa-dot-circle fa-w-16 "
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        style={{ color: 'rgb(0, 42, 81)' }}
                      >
                        <path
                          fill="currentColor"
                          d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"
                        />
                      </svg>
                      Liquid&nbsp;
                      <span>(100.0%)</span>
                    </h6>
                    <h6 className="my-4">
                      <svg
                        className="svg-inline--fa fa-dot-circle fa-w-16 "
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        style={{ color: 'rgb(139, 139, 139)' }}
                      >
                        <path
                          fill="currentColor"
                          d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"
                        />
                      </svg>
                      Pooled&nbsp;
                      <span>(0.0%)</span>
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
                <div
                  style={{ position: 'absolute', width: 6, display: 'none' }}
                >
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
        </div>
      </div>
    </div>
  );
}

export default VaultDashBoard;
