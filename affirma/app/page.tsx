"use client";

import { useEffect, useState } from 'react';
import { getAffirmation } from './utils/fetchAffirmation';
import Affirmation from './components/affirmation';
import { Box, VStack, Text, Textarea, Button, Input } from '@chakra-ui/react';

export default function Home() {
  //const [affirmation, setAffirmation] = useState<string>('');
  const [journalEntry, setJournalEntry] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

 const handleSubmit = () => {
    setSubmitted(true);
    // Add functionality to save the journal entry
  };

  if (submitted) {
    return (
      <Box textAlign="center" mt={10}>
        <Text fontSize="lg" color="teal.600">
          Thank you for taking the time to submit your journal for {new Date().toLocaleDateString()}!
        </Text>
      </Box>
    );
  }

  return (
    <VStack
      spacing={8}
      align="center"
      bg="white"
      p={8}
      borderRadius="md"
      boxShadow="lg"
      maxW="lg"
      mx="auto"
      mt={12}
    >
      <Affirmation />
      
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <Textarea
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
          placeholder="Write your thoughts here..."
          size="lg"
          resize="none"
          bg="gray.50"
          borderColor="teal.300"
        />
        {/* Add fields for photo upload and emoji selection in the future */}
        <Input
          placeholder="Upload a photo (optional)"
          type="file"
          borderColor="teal.300"
          my={4}
        />
        <Button colorScheme="teal" size="md" type="submit">
          Submit
        </Button>
      </form>
    </VStack>
  );
}