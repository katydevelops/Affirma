'use client';

import {
  Box,
  VStack,
  Text,
  Textarea,
  Button,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import Affirmation from './components/affirmation';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from './utils/supabaseClient';

export default function Home() {
  const [journalEntry, setJournalEntry] = useState<string>('');
  const [affirmation, setAffirmation] = useState<string | null>(null); // Using the state for affirmation
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const router = useRouter();

  // Handle submission of the journal entry
  const handleSubmit = async () => {
    onOpen();
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (!session?.user) {
        throw new Error("User not authenticated");
      }

      // Use the affirmation stored in state
      const currentAffirmation = affirmation;

      const { data, error } = await supabase
        .from('journal_entries')
        .insert([
          {
            entry: journalEntry,
            user_id: session.user.id,
            affirmation: currentAffirmation, // Save the dynamic affirmation
          },
        ]);

      if (error) throw error;

      setJournalEntry('');
      setSubmitted(true);
      router.push('/feed');
    } catch (error) {
      console.error('Error submitting journal entry: ', error);
      setSubmitted(false);
    }
  };

  // Handle closing the modal and navigating to the feed page
  const handleModalClose = () => {
    onClose();
    setJournalEntry('');
    router.push('/feed');
  }

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-r, pink.100, orange.100, pink.100)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      <VStack
        spacing={8}
        align="center"
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="xl"
        maxW="lg"
        mx="auto"
      >
        {/* Component to display the daily affirmation */}
        <Affirmation setAffirmation={setAffirmation} />

        {/* Journal entry form */}
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <Textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="Write your thoughts here..."
            size="lg"
            resize="none"
            bg="orange.50"
            borderColor="orange.300"
            focusBorderColor="orange.500"
            _placeholder={{ color: 'orange.300' }}
          />
          <Input
            placeholder="Upload a photo (optional)"
            type="file"
            borderColor="orange.300"
            my={4}
            _focus={{ borderColor: 'orange.500' }}
          />
          <Button colorScheme="orange" size="md" type="submit">
            Submit
          </Button>
        </form>
      </VStack>

      {/* Modal to display after submission */}
      <Modal isOpen={isOpen} onClose={handleModalClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thank You!</ModalHeader>
          <ModalBody>
            <Text fontSize="lg" color="orange.600">
              Thank you for taking the time to submit your journal for {new Date().toLocaleDateString()}!
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" onClick={handleModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
