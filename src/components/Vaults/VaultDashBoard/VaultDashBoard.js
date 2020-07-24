/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { select, area, curveCardinal } from 'd3';
import DonutChart from '../../DonutChart/Index';

const data = [0, 45, 35, 60, 75, 55, 49, 80];
function VaultDashBoard() {
  const svgRef = useRef();
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
  }, []);
  const [segment, setSegment] = useState(null);

  const chartData = [
    {
      value: 1,
      color: '#464B4E',
      name: 'Liquid',
    },
    {
      value: 1,
      color: '#8B8B8B',
      name: 'Pooled',
    },
  ];
  return (
    <div className="vault-dashboard">
      <div className="h-100 dashboard d-flex flex-column">
        <div className="d-flex tab">
          <div className="tab-itm active">
            <h5>Dashboard</h5>
          </div>
          <div className="tab-itm">
            <h5>Contracts</h5>
          </div>
          <div className="tab-itm">
            <h5>Mortgages</h5>
          </div>
          <div className="tab-itm">
            <h5>Co-Investing</h5>
          </div>
          <div className="tab-itm ant-dropdown-trigger">
            <h5>Profile</h5>
          </div>
        </div>
        <div className="dash-transaction">
          <div className="total-portfolio d-flex">
            <div
              role="button"
              tabIndex="0"
              className="total"
              // onClick={() => setChartData(totalDataChart)}
            >
              <h6>Total Portfolio</h6>
              <h4>$1,606.00</h4>
            </div>
            <div className="chart-section">
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
                    <h6 className="my-3 d-flex">
                      <FontAwesomeIcon
                        className="my-auto"
                        icon={faDotCircle}
                        style={{ color: '#464B4E' }}
                      />
                      <h6 className="m-0">
                        Liquid&nbsp;
                        <br />
                        <span>(100.0%)</span>
                      </h6>
                    </h6>
                    <h6 className="my-3 d-flex">
                      <FontAwesomeIcon
                        className="my-auto"
                        icon={faDotCircle}
                        style={{ color: '#8B8B8B' }}
                      />
                      <h6 className="m-0">
                        Pooled&nbsp;
                        <br />
                        <span>(0.0%)</span>
                      </h6>
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
      </div>
    </div>
  );
}

export default VaultDashBoard;
