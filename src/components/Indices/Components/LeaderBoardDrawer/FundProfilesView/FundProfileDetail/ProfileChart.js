import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import Axios from 'axios';

let areaSeries;
function ProfileChart() {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();
  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: '#292934',
        textColor: 'rgba(255, 255, 255, 0.9)',
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
        visible: false,
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
      topColor: '#78788505',
      bottomColor: '#78788005',
      lineColor: '#787885',
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
    areaSeries.setMarkers([
      {
        time: '2019-04-12',
        position: 'inBar',
        color: 'black',
        shape: 'circle',
        text: 'Text To Show',
        number: 0.5,
        id: 1,
      },
      {
        time: '2019-04-17',
        position: 'inBar',
        color: 'grey',
        shape: 'circle',
        text: 'Text To Show',
        number: 0.5,
        id: 2,
      },
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
    resizeObserver.current = new ResizeObserver((entries) => {
      resizeListener();
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, []);

  const getTimeSplit = (dateTimeSec) => {
    let date =
      Date.UTC(
        dateTimeSec.getFullYear(),
        dateTimeSec.getMonth(),
        dateTimeSec.getDate(),
        dateTimeSec.getHours(),
        dateTimeSec.getMinutes(),
        dateTimeSec.getSeconds(),
        0
      ) / 1000;
    return date;
  };

  return (
    <div
      ref={parent}
      className="flex-grow-1 d-flex he0grow"
      // style={{ marginRight: '-1px', marginBottom: '-1px', overflow: 'hidden' }}
    >
      <div ref={chartContainerRef} className="chart-container flex-grow-1" />
    </div>
  );
}

export default ProfileChart;
