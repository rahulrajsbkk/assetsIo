import React, { useState, useRef, useEffect, useContext } from 'react';
import { select, area, curveCardinal } from 'd3';
// const data = [0, 45, 35, 60, 75, 55, 49, 80];

function AssetAreaChart({ today, sevenDay }) {
  const svgRef = useRef();
  useEffect(() => {
    const data = [sevenDay, today];
    const svg = select(svgRef.current);
    const totalWidth = svg._groups[0][0].clientWidth;
    const totalHeight = svg._groups[0][0].clientHeight;
    const maxVal = Math.max(...data);
    const ratio = (totalHeight - 30) / maxVal;
    const myArea = area()
      .x((value, index) => index * (totalWidth / (data.length - 1)))
      .y0(totalHeight)
      .y1((value) => totalHeight - 30 - ratio * value)
      .curve(curveCardinal);

    svg
      .selectAll('path')
      .data([data])
      .join('path')
      .attr('d', (value) => myArea(value))
      .attr('fill', 'url(#grad1)')
      .attr('stroke', 'none');
  }, [sevenDay, today]);
  return (
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
              stopColor: 'rgba(62, 162, 84, 0.4)',
              stopOpacity: 0.8,
            }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default AssetAreaChart;
