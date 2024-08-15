import { Box, VStack, Text, Textarea, Button, Input } from '@chakra-ui/react';
import ErrorBoundary from './components/ErrorBoundary';
import Affirmation from './components/affirmation';

export default function Home() {
  const [journalEntry, setJournalEntry] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = () => {
    setSubmitted(true);
    // Add functionality to save the journal entry
  };

  if (submitted) {
    return (
      <Box textAlign="center" mt={10}>
        <Text fontSize="lg" color="orange.600">
          Thank you for taking the time to submit your journal for {new Date().toLocaleDateString()}!
        </Text>
      </Box>
    );
  }

  return (
    <ErrorBoundary>
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
      </Box>
    </ErrorBoundary>
  );
}
