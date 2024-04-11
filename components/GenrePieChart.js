import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GenrePieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadGoogleCharts = () => {
      if (typeof window !== 'undefined' && !window.google) {
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.onload = () => {
          window.google.charts.load('current', { packages: ['corechart'] });
          window.google.charts.setOnLoadCallback(() => drawChart(data));
        };
        document.body.appendChild(script);
      }
    };

    const drawChart = (chartData) => {
      if (chartData.length > 0 && window.google && window.google.visualization) {
        const dataTable = window.google.visualization.arrayToDataTable([
          ['Genre', 'Number of Games'],
          ...chartData,
        ]);

        const options = {
            backgroundColor: '#171717',
            chartArea: { width: '90%', height: '90%', left: '5%', top: '5%' }, // Adjust chart size within the container
            legend: 'none',
            tooltip: 'none',
            slices: {
              0: { color: '#d8b4fe' },
              1: { color: '#c084fc' },
              2: { color: '#a855f7' },
              3: { color: '#9333ea'},
              4: { color: '#7e22ce'}
              // Add more slice colors as needed
            },
        };

        const chart = new window.google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(dataTable, options);
      }
    };

    if (typeof window !== "undefined") {
      const steamId = localStorage.getItem("steamId");
      axios.get(`http://localhost:5000/steam/api/top_categories?steamid=${steamId}`)
        .then(response => {
          setData(response.data);
          drawChart(response.data);
        })
        .catch(error => {
          console.error('Error fetching Top Categories:', error);
        });
    }

    loadGoogleCharts();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center'>
        <div id="piechart" style={{ width: '200px', height: '200px' }}></div> {/* Adjusted size to be smaller */}
        <h3 className="text-white text-lg">Your Top Genres</h3>
    </div>
  );
};

export default GenrePieChart;
