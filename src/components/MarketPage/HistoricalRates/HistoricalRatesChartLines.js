import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: [
    '20-12-12',
    '21-12-12',
    '22-12-12',
    '23-12-12',
    '24-12-12',
    '25-12-12',
    '26-12-12',
    '27-12-12',
  ],
  datasets: [
    {
      label: 'Compound',
      data: [21, 23, 55, 32, 45, 27, 48, 22],
      backgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointBackgroundColor: 'transparent',
      borderColor: 'rgb(67, 145, 236)',
      borderWidth: 2,
      lineTension: 0.2,
    },
    {
      label: 'Nuo',
      data: [45, 27, 48, 22, 34, 23, 55, 32],
      backgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointBackgroundColor: 'transparent',
      borderColor: 'rgb(178, 208, 204)',
      borderWidth: 2,
      lineTension: 0.2,
    },
    {
      label: 'dY/dX',
      data: [26, 38, 23, 55, 32, 45, 27, 48],
      backgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointBackgroundColor: 'transparent',
      borderColor: 'rgb(123, 209, 245)',
      borderWidth: 2,
      lineTension: 0.2,
    },
  ],
};

const options = {
  scales: {
    xAxes: [
      {
        stacked: false,
      },
    ],
    yAxes: [
      {
        stacked: false,
      },
    ],
  },
  responsiveAnimationDuration: 1000,
  maintainAspectRatio: false,
  legend: false,
};

function HistoricalRatesChartLines() {
  const chart = useRef(null);
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <>
      <Line ref={chart} data={data} options={options}></Line>
    </>
  );
}

export default HistoricalRatesChartLines;
