import React, { useEffect, useState } from 'react';
import './App.scss';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Teams from './components/Teams';
import TeamData from './components/TeamData';
import Nation from './components/Nation';
import Position from './components/Position';
import Search from './components/Search';

function App() {
  const [players, setPlayers] = useState([]);  // State to store players data
  const [loading, setLoading] = useState(true);  // Loading state
  const location = useLocation();  // To get the current URL and query parameters

  useEffect(() => {
    document.title = 'PremierZone Fantasy';

    // Function to generate fetch URL based on query params
    const generateFetchUrl = () => {
      let baseUrl = 'http://localhost:8080/api/v1/player'; // Backend API base URL
      const queryParams = new URLSearchParams(location.search); // Get query params from URL

      // Dynamically construct the URL based on query params
      if (queryParams.toString()) {
        baseUrl += `?${queryParams.toString()}`;
      }

      return baseUrl;
    };

    // Fetch players data based on current URL's query params
    const fetchPlayers = async () => {
      try {
        const response = await fetch(generateFetchUrl());
        const data = await response.json();
        setPlayers(data);  // Set players data in state
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);  // Stop loading
      }
    };

    fetchPlayers();
  }, [location]);  // Re-run effect when the location (route or query params) changes

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="teams" element={<Teams />} />
          <Route path="data" element={<TeamData />} />
          <Route path="nation" element={<Nation />} />
          <Route path="position" element={<Position />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
