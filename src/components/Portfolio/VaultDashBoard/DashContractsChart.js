import React, { useRef, useEffect } from 'react';
import { select, area, line, curveCardinal } from 'd3';

const data = [20, 40, 70, 50, 90, 40];

function DashContractsChart() {
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
      .y1((value) => totalHeight - ratio * value + 20)
      .curve(curveCardinal);
    const myLine = line()
      .x((value, index) => index * (totalWidth / (data.length - 1)))
      .y((value) => totalHeight - ratio * value + 20)
      .curve(curveCardinal);

    svg
      .data([data])
      .append('path')
      .attr('d', (value) => myArea(value))
      .attr('fill', '#464B4E10')
      .attr('stroke', 'none');
    svg
      .data([data])
      .append('path')
      .attr('d', (value) => myLine(value))
      .attr('fill', 'transparent')
      .attr('stroke', '#464B4E')
      .attr('stroke-width', 3);

    svg
      .selectAll('points')
      .data(['', 40, '', '', 90, ''])
      .enter()
      .append('ellipse')
      .attr('fill', '#464B4E')
      .attr('stroke', '#464B4E')
      .attr('rx', 15)
      .attr('ry', 10)
      .attr('transform', function (d, i) {
        return `translate( ${
          i * (totalWidth / (data.length - 1))
        } , ${totalHeight - ratio * d + 20} )`;
      });
  }, []);
  return (
    <div className="chart-wrapper">
      <svg className="chart-curved" ref={svgRef} />
    </div>
  );
}

export default DashContractsChart;
