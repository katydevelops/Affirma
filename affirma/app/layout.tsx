import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ChakraProvider>
      <html lang="en">
        <body>
          <div id="root">
            {children}
          </div>
        </body>
      </html>
    </ChakraProvider>
  );
}