import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import './globals.css';

const inter = Inter({ subsets: ["latin"] });

const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
    },
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "#F0F4F8", // Light pastel background color
        color: "#2D3748", // Calm dark text color
      },
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ChakraProvider theme={theme}>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </ChakraProvider>
    </html>
  );
}