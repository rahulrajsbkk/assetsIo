import React, { useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['20-12-12', '21-12-12', '22-12-12', '23-12-12'],
  datasets: [
    {
      label: 'Compound',
      data: [12, 19, 3, 5],
      backgroundColor: 'rgb(67, 145, 236)',
      borderColor: 'rgb(67, 145, 236)',
      borderWidth: 1,
    },
    {
      label: 'dY/dX',
      data: [12, 5, 2, 3],
      backgroundColor: 'rgb(0, 194, 170)',
      borderColor: 'rgb(0, 194, 170)',
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    xAxes: [
      {
        stacked: true,
      },
    ],
    yAxes: [
      {
        stacked: true,
      },
    ],
  },
  responsiveAnimationDuration: 1000,
  maintainAspectRatio: false,
  legend: false,
};

function LoanChartBar() {
  const chart = useRef(null);
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <>
      <Bar ref={chart} data={data} options={options}></Bar>
    </>
  );
}

export default LoanChartBar;
