// app/page.tsx
import { useEffect, useState } from 'react';
import { getAffirmation } from './utils/fetchAffirmation';

export default function Home() {
  const [affirmation, setAffirmation] = useState<string>('');
  const [journalEntry, setJournalEntry] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    getAffirmation().then(setAffirmation);
  }, []);

  const handleSubmit = () => {
    setSubmitted(true);
    // Need add functionality to save the journal entry
  };

  if (submitted) {
    return <p>Thank you for taking the time to submit your journal for {new Date().toLocaleDateString()}!</p>;
  }

  return (
    <div>
      <h1>Daily Affirmation</h1>
      <p>{affirmation}</p>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <textarea
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
          placeholder="Write your thoughts here..."
        />
        {/* Add fields for photo upload and emoji selection in the future */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
