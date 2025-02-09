import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, ChartDataLabels);

const StructureTypePieChart = ({ data }) => {
  const labels = Object.keys(data);  
  const values = Object.values(data);
  const total = values.reduce((acc, val) => acc + val, 0);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Structure Types',
        data: values,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#F77682',
          '#F7D4A6',
        ],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white', 
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${context.label}: ${value} structures (${percentage}%)`;
          },
        },
      },
      datalabels: {
        color: 'white', 
        formatter: (value, ctx) => {
          let percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`; 
        },
        font: {
          weight: 'bold',
          size: 14,
        },
      },
    },
  };

  return (
    <div style={{ width: '40%', height: '400px', margin: '0 auto' }}>
      <h3>Structure Type Distribution</h3>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default StructureTypePieChart;
