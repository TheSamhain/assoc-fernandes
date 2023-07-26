'use client';
import Header from '@/components/Header';
import './reset.css';
import './globals.css';
import { Inter } from 'next/font/google';
import TabNavigation from '@/components/TabNavigation';
import { ThemeProvider, createTheme, useMediaQuery, useTheme } from '@mui/material';
import { useMemo, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {
    defaultMatches: true,
  });

  const darkTheme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
    },
  });

  return (
    <html lang='pt-BR'>
      <ThemeProvider theme={darkTheme}>
        <body className={inter.className}>
          <Header />
          <main style={{ flex: 1, padding: '10px', overflow: 'auto' }}>{children}</main>
          <TabNavigation />
        </body>
      </ThemeProvider>
    </html>
  );
}
