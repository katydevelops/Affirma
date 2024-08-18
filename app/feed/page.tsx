'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Box, VStack, Text } from '@chakra-ui/react';

export default function Feed() {
  const [entries, setEntries] = useState<{ id: number, entry: string, created_at: string }[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching entries:', error);
      } else {
        setEntries(data || []);
      }
    };

    fetchEntries();
  }, []);

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        {entries.map((entry) => (
          <Box key={entry.id} p={4} bg="orange.50" borderRadius="lg" boxShadow="md">
            <Text>{entry.entry}</Text>
            <Text fontSize="sm" color="gray.500">{new Date(entry.created_at).toLocaleString()}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
