import React from 'react';
import { Line } from 'chart.js';
import './ImageProcessingChart.css';

// interface DataPoint {
//   month: string;
//   value: number;
// }

const ImageProcessingChart = () => {
//   const data: DataPoint[] = [
//     { month: 'JAN 24', value: 9 },
//     { month: 'FEB 24', value: 6 },
//     { month: 'MAR 24', value: 8 },
//     { month: 'APR 24', value: 6 },
//     { month: 'MAY 24', value: 4 },
//     { month: 'JUN 24', value: 10 }
//   ];


const data = [
  { month: 'JAN 24', value: 9 },
  { month: 'FEB 24', value: 6 },
  { month: 'MAR 24', value: 8 },
  { month: 'APR 24', value: 6 },
  { month: 'MAY 24', value: 4 },
  { month: 'JUN 24', value: 10 }
];

const chartData = {
    labels: data.map(point => point.month),
    datasets: [
      {
        label: 'Failure Rate',
        data: data.map(point => point.value),
        borderColor: '#7A5AF8',
        backgroundColor: 'rgba(122, 90, 248, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 2
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <div className="chart-title">
        Image Processing Failure Rate (IPFR)
      </div>
      <div className="chart-content">
        <div className="y-axis-label">
          Image Processing Failure Rate
        </div>
        <div className="chart-area">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ImageProcessingChart;

