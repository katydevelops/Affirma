'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '../utils/auth';
import { supabase } from '../utils/supabaseClient'; // Importing supabase
import { Box, Input, Button, VStack, Text } from '@chakra-ui/react';

export default function SignUp() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

  if (password !== confirmPassword) {
    setError('Passwords do not match');
    return;
  }

  try {
const { data, error } = await supabase.auth.signUp({
  email: email,
  password: password,
  options: {
    data: {
      username: username,
      first_name: firstName,
      last_name: lastName,
      phone: phone,
    },
  },
});


    if (error) throw error;

    router.push('/');
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
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <Input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <Input
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
      </VStack>
    </Box>
  );
}
