'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '../utils/auth';
import { Box, Input, Button, VStack, Text, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signIn(email, password);
      router.push('/');  // Redirect after successful login
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
          Log In
        </Text>
        {error && <Text color="red.500">{error}</Text>}
        <form onSubmit={handleLogin}>
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
              Log In
            </Button>
          </VStack>
        </form>
        <Text fontSize="sm" color="gray.500" mt={4}>
          Don&apos;t have an account?{' '}
          <ChakraLink as={Link} href="/signup" color="orange.500">
            Sign Up
          </ChakraLink>
        </Text>
      </VStack>
    </Box>
  );
}
