import axios from 'axios';

export async function getAffirmation(): Promise <string> {
    try {
        const response = await axios.get('https://www.affirmations.dev');
        return response.data.affirmation;
    } catch (error) {
        console.error('Error fetching affirmation', error);
        throw new Error('Unable to fetch affirmation')
    }
}