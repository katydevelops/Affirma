import React, { useEffect, useState } from 'react';
import { getAffirmation } from '../utils/fetchAffirmation';

export default function Affirmation() {
  const [affirmation, setAffirmation] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAffirmation();
        setAffirmation(data);
      } catch (err) {
        setError('Failed to load affirmation');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Daily Affirmation</h1>
      <p>{affirmation}</p>
    </div>
  );
}