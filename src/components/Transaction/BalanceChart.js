import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

let areaSeries;
function BalanceChart() {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();
  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: '#00000000',
        textColor: 'rgba(99, 114, 130, 0.6)',
      },
      grid: {
        vertLines: {
          visible: false,
          color: '#334158',
        },
        horzLines: {
          visible: false,
          color: '#334158',
        },
      },
      priceScale: {
        borderVisible: false,
        borderColor: '#485c7b',
        position: 'none',
      },
      timeScale: {
        borderVisible: false,
        borderColor: '#485c7b',
        visible: true,
      },
      crosshair: {
        vertLine: {
          visible: false,
          labelVisible: false,
        },
        horzLine: {
          visible: false,
          labelVisible: false,
        },
        mode: 1,
      },
    });

    areaSeries = chart.current.addAreaSeries({
      topColor: 'rgba(45, 125, 255, 0.15)',
      bottomColor: 'rgba(45, 125, 255, 0)',
      lineColor: '#2D7DFF',
      lineStyle: 0,
      lineWidth: 2,
      title: 'Earnins',
      crosshairMarkerVisible: true,
      priceLineVisible: false,
      lastValueVisible: false,
    });
    areaSeries.setData([
      { time: '2019-04-12', value: 80.63 },
      { time: '2019-04-13', value: 76.64 },
      { time: '2019-04-14', value: 81.89 },
      { time: '2019-04-15', value: 74.43 },
      { time: '2019-04-16', value: 80.01 },
      { time: '2019-04-17', value: 96.63 },
      { time: '2019-04-18', value: 76.64 },
      { time: '2019-04-19', value: 81.89 },
      { time: '2019-04-20', value: 74.43 },
    ]);
    return () => {
      if (areaSeries) chart.current.removeSeries(areaSeries);
    };
  }, []);

  const parent = useRef();
  const resizeListener = () => {
    chart.current.applyOptions({
      width: parent.current.offsetWidth - 1,
      height: parent.current.offsetHeight - 1,
    });
    setTimeout(() => {
      chart.current.timeScale().fitContent();
    }, 0);
  };

  useEffect(() => {
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);
  useEffect(() => {
    resizeObserver.current = new ResizeObserver(() => {
      resizeListener();
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, []);

  // const getTimeSplit = (dateTimeSec) => {
  //   let date =
  //     Date.UTC(
  //       dateTimeSec.getFullYear(),
  //       dateTimeSec.getMonth(),
  //       dateTimeSec.getDate(),
  //       dateTimeSec.getHours(),
  //       dateTimeSec.getMinutes(),
  //       dateTimeSec.getSeconds(),
  //       0
  //     ) / 1000;
  //   return date;
  // };

  return (
    <div ref={parent} className="flex-grow-1 d-flex">
      <div ref={chartContainerRef} className="chart-container flex-grow-1" />
    </div>
  );
}

export default BalanceChart;
