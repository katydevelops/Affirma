'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Box, VStack, Text } from '@chakra-ui/react';

export default function Feed() {
  const [entries, setEntries] = useState<
    { id: number, entry: string, created_at: string, affirmation: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEntries = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (!session?.user) {
        console.error('User is not authenticated');
        setLoading(false);
        return;
      }

      const userId = session.user.id;

      const { data, error } = await supabase
        .from('journal_entries')
        .select('id, entry, created_at, affirmation') // Include the affirmation in the select
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching entries:', error);
      } else {
        console.log('Fetched Entries:', data);
        setEntries(data || []);
      }
      setLoading(false);
    };

    fetchEntries();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!entries.length) {
    return <Text>No journal entries found.</Text>;
  }

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        {entries.map((entry) => (
          <Box key={entry.id} p={4} bg="orange.50" borderRadius="lg" boxShadow="md">
            <Text>{entry.entry}</Text>
            <Text fontSize="sm" color="gray.500">
              {new Date(entry.created_at).toLocaleString()}
            </Text>
            <Box mt={2} p={2} bg="orange.100" borderRadius="md" boxShadow="sm">
              <Text fontSize="md" color="orange.800" fontStyle="italic">
                &quot;{entry.affirmation}&quot;
              </Text>
            </Box>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

