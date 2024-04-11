import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GenrePieChart = () => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [chartsLoaded, setChartsLoaded] = useState(false); // New state for charts library load status

  // Define drawChart outside of useEffect so it's accessible everywhere within this component.
  const drawChart = (chartData) => {
    if (chartData.length > 0 && window.google && window.google.visualization && chartsLoaded) {
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
          3: { color: '#9333ea' },
          4: { color: '#7e22ce' }
          // Add more slice colors as needed
        },
      };

      const chart = new window.google.visualization.PieChart(document.getElementById('piechart'));
      chart.draw(dataTable, options);
    }
  };

  useEffect(() => {
    const loadGoogleCharts = () => {
      if (typeof window !== 'undefined' && !window.google) {
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.onload = () => {
          window.google.charts.load('current', { packages: ['corechart'] });
          window.google.charts.setOnLoadCallback(() => setChartsLoaded(true));
        };
        document.body.appendChild(script);
      } else {
        setChartsLoaded(true);
      }
    };

    loadGoogleCharts();
  }, []);

  useEffect(() => {
    const steamId = localStorage.getItem("steamId");
    axios.get(`http://localhost:5000/steam/api/top_categories?steamid=${steamId}`)
      .then(response => {
        setData(response.data);
        setLoaded(true); // Data has been loaded
      })
      .catch(error => {
        console.error('Error fetching Top Categories:', error);
      });
  }, []);

  // Added useEffect to handle drawing the chart once everything is loaded.
  useEffect(() => {
    if (loaded && chartsLoaded) {
      drawChart(data);
    }
  }, [loaded, chartsLoaded, data]); // Ensure drawChart is accessible and runs when dependencies change.

  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        {loaded && chartsLoaded ? (
          <div id="piechart" style={{ width: '200px', height: '200px' }}></div>
        ) : (
          <div>
            <img src='/loading.gif' className='h-48'/>
          </div>
        )}
        <h3 className="text-white text-lg">Your Top Genres</h3>
      </div>
    </>
  );
};

export default GenrePieChart;
