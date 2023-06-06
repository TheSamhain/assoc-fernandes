'use client';
import Header from '@/components/Header';
import './globals.css';
import { Inter } from 'next/font/google';
import TabNavigation from '@/components/TabNavigation';
import { ThemeProvider, createTheme } from '@mui/material';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='pt-BR'>
			<body className={inter.className}>
				<ThemeProvider theme={darkTheme}>
					<Header />
					<main style={{ flex: 1, padding: '10px' }}>{children}</main>
					<TabNavigation />
				</ThemeProvider>
			</body>
		</html>
	);
}
