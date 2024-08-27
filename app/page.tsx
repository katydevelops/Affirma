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
import { supabase } from './utils/supabaseClient'

export default function Home() {
  const [journalEntry, setJournalEntry] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const router = useRouter();


const handleSubmit = async () => {
  onOpen();
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from('journal_entries')
      .insert([{ entry: journalEntry, user_id: session.user.id }]);

    if (error) throw error;

    setJournalEntry('');
    setSubmitted(true);
  } catch (error) {
    console.error('Error submitting journal entry: ', error);
    setSubmitted(false);
  }
};




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
        <Affirmation />
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

      {/* Modal */}
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
