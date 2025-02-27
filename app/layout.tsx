import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './components/ThemeProvider';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Quicker Books',
  description: 'a minimalist expense tracker app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={roboto.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
