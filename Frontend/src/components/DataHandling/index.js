import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./index.scss";

const DataHandling = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const teamValue = params.get('team');

    if (teamValue) {
      axios.get(`http://localhost:8080/api/v1/player?team=${encodeURIComponent(teamValue)}`)
        .then(response => {
          console.log("Data fetched: ", response.data);
          setPlayerData(response.data); // Store data in the state
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching data: ", error);
          setError(error);
          setLoading(false);
        });
    } else {
      setLoading(false); // Handle the case where no team is provided
    }
  }, []); // Empty dependency array so it runs only once when component mounts

  console.log("Player Data in Render:", playerData); // This will show the current state of playerData

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="table-container">
      {/* Render the player data as JSON for debugging */}
      <pre>{JSON.stringify(playerData, null, 2)}</pre>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Nation</th>
            <th>Position</th>
            <th>Age</th>
            <th>Matches Played</th>
            <th>Starts</th>
            <th>Minutes Played</th>
            <th>Goals</th>
            <th>Assists</th>
            <th>Penalties Kicked</th>
            <th>Yellow Cards</th>
            <th>Red Cards</th>
            <th>Expected Goals (xG)</th>
            <th>Expected Assists (xAG)</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {playerData.map(player => (
            <tr key={player.name}>
              <td>{player.name || "N/A"}</td>
              <td>{player.nation.split(" ")[0] || "N/A"}</td> {/* Extract country code */}
              <td>{player.position || "N/A"}</td>
              <td>{player.age || "N/A"}</td>
              <td>{player.mp || 0}</td>
              <td>{player.starts || 0}</td>
              <td>{player.min || 0}</td>
              <td>{player.goals || 0}</td>
              <td>{player.assists || 0}</td>
              <td>{player.penalties || 0}</td>
              <td>{player.yellow_cards || 0}</td>
              <td>{player.red_cards || 0}</td>
              <td>{player.expected_goals || 0}</td>
              <td>{player.expected_assists || 0}</td>
              <td>{player.team_name || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataHandling;
