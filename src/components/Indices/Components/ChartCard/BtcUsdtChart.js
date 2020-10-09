import React, { useEffect, useRef, useState, useContext } from 'react';
import { createChart } from 'lightweight-charts';
import { OptionsContext } from '../../ContextAPI/OptionContext';
import Axios from 'axios';

let areaSeries;
let priceLineSeries;
let priceCandleStick;
let priceBarSeries;
let endDateLine;
let startDateLine;
let strikePriceLine;
let ws;
function BtcUsdtChart() {
  const {
    tickerTime,
    coin,
    startDate,
    endDate,
    chartType,
    cryptoTimeRate,
    setCryptoTimeRate,
    strikeRate,
  } = useContext(OptionsContext);
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();
  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: '#fff',
        textColor: '#464b4e',
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
        position: 'right',
      },
      timeScale: {
        borderVisible: false,
        borderColor: '#485c7b',
        visible: true,
        timeVisible: true,
        secondsVisible: true,
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

    endDateLine = chart.current.addCandlestickSeries({
      upColor: 'rgba(0, 0, 0, 0)',
      downColor: 'rgba(0, 0, 0, 0)',
      borderDownColor: 'rgba(0, 0, 0, 0)',
      borderUpColor: 'rgba(0, 0, 0, 0)',
      wickDownColor: 'rgba(255, 20, 0, 1)',
      wickUpColor: 'rgba(255, 20, 0, 1)',
      overlay: true,
      scaleMargins: {
        top: 0,
        bottom: 0.02,
      },
      priceLineVisible: false,
      lastValueVisible: false,
    });
    endDateLine.setData([]);

    startDateLine = chart.current.addCandlestickSeries({
      upColor: 'rgba(0, 0, 0, 0)',
      downColor: 'rgba(0, 0, 0, 0)',
      borderDownColor: 'rgba(0, 0, 0, 0)',
      borderUpColor: 'rgba(0, 0, 0, 0)',
      wickDownColor: 'rgba(100, 100, 100, 1)',
      wickUpColor: 'rgba(100, 100, 100, 1)',
      overlay: true,
      scaleMargins: {
        top: 0,
        bottom: 0.02,
      },
      priceLineVisible: false,
      lastValueVisible: false,
    });

    areaSeries = chart.current.addAreaSeries({
      topColor: '#464b4e',
      bottomColor: '#e7e7e7',
      lineColor: '#464b4e',
      lineStyle: 0,
      lineWidth: 2,
      crosshairMarkerVisible: false,
      priceLineVisible: false,
      lastValueVisible: false,
    });

    priceCandleStick = chart.current.addCandlestickSeries({
      priceLineVisible: false,
      lastValueVisible: false,
    });

    priceLineSeries = chart.current.addLineSeries({
      color: 'rgba(33, 150, 243, 1)',
      lineWidth: 3,
      priceLineVisible: false,
      lastValueVisible: false,
    });

    priceBarSeries = chart.current.addHistogramSeries({
      color: 'rgba(76, 175, 80, 0.5)',
      priceLineVisible: false,
      lastValueVisible: false,
    });

    // strikePriceLine = chart.current.addLineSeries({
    //   color: "rgba(255, 0, 0, 1)",
    //   lineWidth: 1,
    // });
    return () => {
      if (areaSeries) chart.current.removeSeries(areaSeries);
      try {
        if (strikePriceLine) chart.current.removePriceLine(strikePriceLine);
      } catch (error) {}
    };
  }, []);
  const [firstData, setFirstData] = useState([]);
  useEffect(() => {
    Axios.get(
      `https://api.binance.com/api/v3/trades?symbol=${coin}USDT&limit=1000`
    ).then((res) => {
      setFirstData(res.data);
    });
  }, [coin, tickerTime]);

  const parent = useRef();

  const resizeListener = () => {
    chart.current.applyOptions({
      width: parent.current.offsetWidth - 1,
      height: parent.current.offsetHeight - 1,
    });
    setTimeout(() => {
      chart.current.timeScale().scrollToRealTime();
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

  useEffect(() => {
    resizeListener();
  }, []);

  // const currencyPair = "btcusd";
  const [wsOpen, setWsOpen] = useState(false);
  const [unSubscribe, setUnSubscribe] = useState({
    method: 'UNSUBSCRIBE',
    params: [`${coin.toLowerCase()}usdt@trade`],
    id: 1,
  });
  const [wsResp, setWsResp] = useState();
  useEffect(() => {
    console.log('ws :>> ', 'ws');
    ws = new WebSocket(`wss://stream.binance.com:9443/ws/btcusdt@trade`);
    console.log('wsd :>> ', 'wsd');
    ws.onopen = () => {
      setWsOpen(true);
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      setWsResp(response);
    };
    ws.onclose = () => {
      ws.close();
      setWsOpen(false);
    };

    return () => {
      ws.close();
      setWsOpen(false);
    };
  }, []);

  useEffect(() => {
    if (wsOpen) {
      const subscribe = {
        method: 'SUBSCRIBE',
        params: [`${coin.toLowerCase()}usdt@trade`],
        id: 1,
      };
      ws.send(JSON.stringify(unSubscribe));
      ws.send(JSON.stringify(subscribe));
      setUnSubscribe({
        method: 'UNSUBSCRIBE',
        params: [`${coin.toLowerCase()}usdt@trade`],
        id: 1,
      });
    }
  }, [wsOpen, coin]);

  const getTimeSplit = (dateTimeSec) => {
    let date;
    switch (tickerTime) {
      case '30s': {
        date =
          Date.UTC(
            dateTimeSec.getFullYear(),
            dateTimeSec.getMonth(),
            dateTimeSec.getDate(),
            dateTimeSec.getHours(),
            dateTimeSec.getMinutes(),
            parseInt(dateTimeSec.getSeconds() / 30) * 30,
            0
          ) / 1000;
        break;
      }
      case '1m': {
        date =
          Date.UTC(
            dateTimeSec.getFullYear(),
            dateTimeSec.getMonth(),
            dateTimeSec.getDate(),
            dateTimeSec.getHours(),
            dateTimeSec.getMinutes(),
            0,
            0
          ) / 1000;
        break;
      }
      case '5m': {
        date =
          Date.UTC(
            dateTimeSec.getFullYear(),
            dateTimeSec.getMonth(),
            dateTimeSec.getDate(),
            dateTimeSec.getHours(),
            parseInt(dateTimeSec.getMinutes() / 5) * 5,
            0,
            0
          ) / 1000;
        break;
      }
      default: {
        date =
          Date.UTC(
            dateTimeSec.getFullYear(),
            dateTimeSec.getMonth(),
            dateTimeSec.getDate(),
            dateTimeSec.getHours(),
            dateTimeSec.getMinutes(),
            dateTimeSec.getSeconds(),
            0
          ) / 1000;
      }
    }
    return date;
  };

  useEffect(() => {
    if (areaSeries) {
      areaSeries.setData([]);
    }
    if (priceCandleStick) {
      priceCandleStick.setData([]);
    }
    if (priceLineSeries) {
      priceLineSeries.setData([]);
    }
    if (priceBarSeries) {
      priceBarSeries.setData([]);
    }
    return () => {};
  }, [tickerTime, coin, chartType]);

  useEffect(() => {
    if (wsResp && wsResp.s === `${coin}USDT`) {
      if (wsResp.e === 'trade') {
        if (wsResp.T && wsResp.p) {
          var dateTimeSec = new Date(wsResp.T);
          var utcDateTimeSec = getTimeSplit(dateTimeSec);
          setCryptoTimeRate({
            time: utcDateTimeSec,
            value: wsResp.p,
          });
          if (areaSeries && chartType === 'area') {
            areaSeries.update({
              time: utcDateTimeSec,
              value: wsResp.p,
            });
          } else if (priceLineSeries && chartType === 'line') {
            priceLineSeries.update({
              time: utcDateTimeSec,
              value: wsResp.p,
            });
          } else if (priceBarSeries && chartType === 'bar') {
            priceBarSeries.update({
              time: utcDateTimeSec,
              value: wsResp.p,
            });
          }
          if (startDate) {
            if (startDateLine) {
              startDateLine.setData([
                {
                  time: startDate,
                  open: 0,
                  high: 1,
                  low: 0,
                  close: 0,
                },
              ]);
            }
          }
          if (endDate) {
            let endDateTime = new Date(endDate);
            let endDateTimeSec =
              Date.UTC(
                endDateTime.getFullYear(),
                endDateTime.getMonth(),
                endDateTime.getDate(),
                endDateTime.getHours(),
                endDateTime.getMinutes(),
                endDateTime.getSeconds(),
                0
              ) / 1000;
            endDateLine.setData([
              {
                time: endDateTimeSec,
                open: 0,
                high: 1,
                low: 0,
                close: 0,
              },
            ]);
          }
        }
      } else if (wsResp.e === 'kline') {
        if (priceCandleStick && chartType === 'candle') {
          if (wsResp.k && wsResp.k.T && wsResp.k.i === tickerTime) {
            var dateTimeSecVol = new Date(wsResp.k.T);
            var utcDateTimeSecVol =
              Date.UTC(
                dateTimeSecVol.getFullYear(),
                dateTimeSecVol.getMonth(),
                dateTimeSecVol.getDate(),
                dateTimeSecVol.getHours(),
                dateTimeSecVol.getMinutes(),
                dateTimeSecVol.getSeconds(),
                0
              ) / 1000;
            priceCandleStick.update({
              time: utcDateTimeSecVol,
              open: wsResp.k.o,
              high: wsResp.k.h,
              low: wsResp.k.l,
              close: wsResp.k.c,
            });
          }
        }
      }
    }
    return () => {};
  }, [wsResp, tickerTime, coin]);

  useEffect(() => {
    if (strikePriceLine) {
      areaSeries.removePriceLine(strikePriceLine);
    }
    if (strikeRate) {
      if (areaSeries) {
        if (strikeRate.call)
          strikePriceLine = areaSeries.createPriceLine({
            price: strikeRate.value,
            color: 'green',
            lineWidth: 1,
          });
        else
          strikePriceLine = areaSeries.createPriceLine({
            price: strikeRate.value,
            color: 'red',
            lineWidth: 1,
          });
      }
    }
  }, [strikeRate]);

  useEffect(() => {
    firstData.forEach((data) => {
      if (data.price && data.time) {
        var dateTimeSec = new Date(data.time);
        var utcDateTimeSec = getTimeSplit(dateTimeSec);
        if (areaSeries && chartType === 'area') {
          areaSeries.update({
            time: utcDateTimeSec,
            value: data.price,
          });
        }
      }
    });
  }, [firstData]);

  return (
    <div
      ref={parent}
      className="flex-grow-1 d-flex he0grow"
      style={{ marginRight: '-1px', marginBottom: '-1px', overflow: 'hidden' }}
    >
      <div ref={chartContainerRef} className="chart-container flex-grow-1" />
    </div>
  );
}

export default BtcUsdtChart;
