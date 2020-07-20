import React from 'react';
import * as d3 from 'd3';

const Arc = ({
  data,
  index,
  createArc,
  colors,
  onMouseOver,
  onMouseOut,
  segment,
}) => {
  const colorsArray = ['#002A51', '#8B8B8B'];
  return (
    <g key={index} className="arc">
      <path
        opacity={segment === index || segment === null ? 1 : 0.1}
        onMouseEnter={() => onMouseOver(index)}
        onMouseLeave={() => onMouseOut()}
        className="arc"
        d={createArc(data)}
        fill={colorsArray[index] ? colorsArray[index] : colors(index)}
      />
    </g>
  );
};

// eslint-disable-next-line object-curly-newline
const DonutChart = ({ onMouseOver, onMouseOut, pieData, segment }) => {
  const innerRadius = 120;
  const outerRadius = 150;
  const createPie = d3
    .pie()
    .value((d) => d.value)
    .sort(null);
  const createArc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  const data = createPie(pieData);

  return (
    <svg viewBox="0 0 300 300" style={{ width: '100%', height: '100%' }}>
      <g transform={`translate(${outerRadius} ${outerRadius})`}>
        {data.map((d, i) => (
          <Arc
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            data={d}
            index={i}
            createArc={createArc}
            colors={colors}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onFocus={onMouseOver}
            onBlur={onMouseOut}
            segment={segment}
          />
        ))}
      </g>
    </svg>
  );
};

export default DonutChart;
