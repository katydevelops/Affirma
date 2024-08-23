'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '../utils/auth';
import { Box, Input, Button, VStack, Text, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

export default function SignUp() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signUp({
        firstName,
        lastName,
        phone,
        email,
        username,
        password
      });
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
          Register
        </Text>
        {error && <Text color="red.500">{error}</Text>}
        <form onSubmit={handleSignUp}>
          <VStack spacing={4}>
            <Input
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              required
            />
            <Input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              required
            />
            <Input
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              required
            />
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              required
            />
            <Input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
            <Input
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              required
            />
            <Button type="submit" colorScheme="orange" size="md" width="100%">
              Sign Up
            </Button>
          </VStack>
        </form>
        <Text fontSize="sm" color="gray.500" mt={4}>
          Already have an account?{' '}
          <ChakraLink as={Link} href="/login" color="orange.500">
            Log In
          </ChakraLink>
        </Text>
      </VStack>
    </Box>
  );
}
