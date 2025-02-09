import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; 


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const BarChart = ({ damageData, barTitle, dataLable }) => {
  const data = {
    labels: Object.keys(damageData),
    datasets: [
      {
        label: dataLable,
        data: Object.values(damageData),
        backgroundColor: "#FF5722",
        borderColor: "#E64A19",
        borderWidth: 2,
        hoverBackgroundColor: "#FF7043",
        hoverBorderColor: "#D32F2F",
        datalabels: {
          color: "#fff", 
          font: {
            weight: 'bold', 
          },
        },
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,  
          color: "#fff", 
        },
      },
      x: {
        ticks: {
          color: "#fff", 
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,  
        backgroundColor: "rgba(0, 0, 0, 0.7)", 
        titleColor: "#fff",  
        bodyColor: "#fff",   
      },
      legend: {
        labels: {
          color: "#fff", 
        },
      },
      datalabels: {
        color: "#fff", 
        font: {
          weight: 'bold', 
        },
      },
    },
  };

  return (
    <div style={{ width: '40%', margin: '0 auto', paddingTop: '50px' }}>
      <h3>{barTitle}</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
