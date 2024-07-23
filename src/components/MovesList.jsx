import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MoveDetails from './MoveDetails';

const MovesList = () => {
  const [moves, setMoves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoves = async () => {
      try {
        const response = await axios.get('http://test.api.boxigo.in/sample-data/');
        setMoves(response.data.Customer_Estimate_Flow);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch moves data');
        setLoading(false);
      }
    };

    fetchMoves();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Moves</h1>
      {moves.map((move) => (
        <MoveDetails key={move.estimate_id} move={move} />
      ))}
    </div>
  );
};

export default MovesList;
