import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./index.scss";
import AnimatedLetters from "../AnimatedLetters";

const TeamData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerData, setPlayerData] = useState([]);
  const [playersToShow, setPlayersToShow] = useState(10);
  const [letterClass] = useState('text-animate');
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const teamValue = params.get('team');
    const nationValue = params.get('nation');
    const positionValue = params.get('position');
    const nameValue = params.get('name');
    
    if (teamValue) {
      axios.get(`http://localhost:8080/api/v1/player?team=${encodeURIComponent(teamValue)}`)
        .then(response => {
          setPlayerData(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    } else if (nationValue){
      axios.get(`http://localhost:8080/api/v1/player?nation=${encodeURIComponent(nationValue)}`)
      .then(response => {
        setPlayerData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
    } else if (positionValue){
      axios.get(`http://localhost:8080/api/v1/player?position=${encodeURIComponent(positionValue)}`)
      .then(response => {
        setPlayerData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
    } else if (nameValue){
      axios.get(`http://localhost:8080/api/v1/player?name=${encodeURIComponent(nameValue)}`)
      .then(response => {
        setPlayerData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
    }
      else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }


  return (
    <div className={`fade-in ${loading ? 'loading' : ''}`}>
    <div className="table-container">
      <h1 className = "page-title">
        <AnimatedLetters letterClass = {letterClass} strArray={"Player Data".split("")} idx={12}/>
      </h1>
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
          {playerData.slice(0, playersToShow).map(player => (
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
      {playersToShow < playerData.length && (
        <button onClick={() => setPlayersToShow(playersToShow + 10)} style={{ marginTop: '10px', marginBottom: '10px' }} className={`show-more-button ${loading ? 'loading' : ''}`}>
          Show More
        </button>
      )}
    </div>
    </div>
  );
};

export default TeamData;
