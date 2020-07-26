import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['20-12-12', '21-12-12', '22-12-12', '23-12-12'],
  datasets: [
    {
      label: 'Compound',
      data: [12, 19, 3, 5],
      backgroundColor: 'transparent',
      borderColor: 'rgb(67, 145, 236)',
      pointBorderColor: 'transparent',
      pointBackgroundColor: 'transparent',
      borderWidth: 1,
    },
    {
      label: 'dY/dX',
      data: [12, 5, 2, 3],
      backgroundColor: 'transparent',
      borderColor: 'rgb(0, 194, 170)',
      pointBorderColor: 'transparent',
      pointBackgroundColor: 'transparent',
      borderWidth: 1,
    },
    {
      label: 'Maker SCD',
      data: [10, 8, 6, 9],
      backgroundColor: 'transparent',
      borderColor: 'rgb(151, 56, 235)',
      pointBorderColor: 'transparent',
      pointBackgroundColor: 'transparent',
      borderWidth: 1,
    },
  ],
};

const options = {
  responsiveAnimationDuration: 1000,
  maintainAspectRatio: false,
  legend: false,
};

function LoanChartLine() {
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

export default LoanChartLine;
