import type { NextApiRequest, NextApiResponse } from 'next';

const API_URL = 'https://www.affirmations.dev';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch affirmation' });
  }
}