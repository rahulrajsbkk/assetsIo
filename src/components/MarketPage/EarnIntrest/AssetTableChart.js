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
      backgroundColor: 'rgba(62, 162, 84, 0.4)',
      pointBorderColor: 'transparent',
      pointBackgroundColor: 'transparent',
      borderColor: '#3EA254',
      borderWidth: 2,
      lineTension: 0,
    },
  ],
};

const options = {
  scales: {
    xAxes: [
      {
        display: false,
        stacked: false,
      },
    ],
    yAxes: [
      {
        display: false,
        stacked: false,
      },
    ],
  },
  responsiveAnimationDuration: 1000,
  maintainAspectRatio: false,
  legend: false,
};

function AssetTableChart() {
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

export default AssetTableChart;
