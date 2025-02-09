import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels);

const CityBarChart = ({ cityData }) => {
  const sortedCities = Object.entries(cityData).sort((a, b) => b[1] - a[1]);

  const labels = sortedCities.map((city) => city[0]);
  const values = sortedCities.map((city) => city[1]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Number of Incidents",
        data: values,
        backgroundColor: "#4CAF50",
        borderColor: "#388E3C",
        borderWidth: 2,
        hoverBackgroundColor: "#66BB6A",
        hoverBorderColor: "#2C6B2F",
        datalabels: {
          color: "#fff", 
          font: {
            weight: "bold",
          },
        },
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: "y", 
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#fff",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "#fff", 
        bodyColor: "#fff",
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: "#fff",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#fff",
        },
      },
    },
  };

  return (
    <div style={{ width: "40%", margin: "0 auto", paddingTop: "50px" }}>
      <h3>City's Incidents Distribution</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default CityBarChart;
