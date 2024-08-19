import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '../utils/auth';
import { Box, Input, Button, VStack, Text } from '@chakra-ui/react';

export default function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signUp(email, password);
      router.push('/');  // Redirect after successful sign-up
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-r, pink.100, orange.100, pink.100)"
    >
      <VStack
        spacing={4}
        p={8}
        bg="white"
        borderRadius="lg"
        boxShadow="xl"
        maxW="lg"
        mx="auto"
      >
        <Text fontSize="2xl" fontWeight="bold">
          Sign Up
        </Text>
        {error && <Text color="red.500">{error}</Text>}
        <form onSubmit={handleSignUp}>
          <VStack spacing={4}>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            <Input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
            <Button type="submit" colorScheme="orange" size="md" width="100%">
              Sign Up
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
}
