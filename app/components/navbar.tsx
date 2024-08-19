'use client';

import Link from 'next/link';
import { Box, Flex, HStack, Link as ChakraLink, Text } from '@chakra-ui/react';

export default function Navbar() {
  return (
    <Box bg="orange.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="center">
        <HStack as="nav" spacing={8}>
          <ChakraLink as={Link} href="/" color="white">
            Home
          </ChakraLink>
          <ChakraLink as={Link} href="/feed" color="white">
            Feed
          </ChakraLink>
          <ChakraLink as={Link} href="/profile" color="white">
            Profile
          </ChakraLink>
        </HStack>
      </Flex>
    </Box>
  );
}
