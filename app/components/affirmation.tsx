import { useEffect, useState } from 'react';
import { getAffirmation } from '../utils/getAffirmation';

const Affirmation = () => {
  const [affirmation, setAffirmation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const storedDate = localStorage.getItem('affirmationDate');
        const storedAffirmation = localStorage.getItem('affirmation');
        const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

        if (storedDate === today && storedAffirmation) {
          setAffirmation(storedAffirmation);
        } else {
          const data = await getAffirmation();
          setAffirmation(data.affirmation);
          localStorage.setItem('affirmation', data.affirmation);
          localStorage.setItem('affirmationDate', today);
        }
      } catch (err) {
        setError('Failed to load affirmation');
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Your Daily Affirmation</h2>
      {affirmation ? <p>{affirmation}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Affirmation;
