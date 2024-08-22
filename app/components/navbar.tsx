'use client';

import Link from 'next/link';
import { Box, Flex, HStack, Link as ChakraLink } from '@chakra-ui/react';

export default function Navbar() {
  return (
    <Box as="nav"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={4}
      bg="transparent"
      position="relative"
      zIndex={1} 
    >
      <Flex h={16} alignItems="center" justifyContent="center">
        <HStack as="nav" spacing={8}>
          <ChakraLink as={Link} href="/" color="darkorange" fontWeight="bold">
            Home
          </ChakraLink>
          <ChakraLink as={Link} href="/feed" color="darkorange" fontWeight="bold">
            Feed
          </ChakraLink>
          <ChakraLink as={Link} href="/profile" color="darkorange" fontWeight="bold">
            Profile
          </ChakraLink>
        </HStack>
        <ChakraLink as={Link} href="/login" color="darkorange" fontWeight="bold">Sign In</ChakraLink>
      </Flex>
    </Box>
  );
}
