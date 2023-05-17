import Header from '@/components/Header';
import './globals.css';
import { Inter } from 'next/font/google';
import TabNavigation from '@/components/TabNavigation';
import styles from './layout.module.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Associação Fernandes de Karatê - Shito Ryu',
	description: 'Site para Associação Fernandes de Karatê - Shito Ryu',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='pt-BR'>
			<body className={inter.className}>
				<Header />
				<main className={styles.main}>{children}</main>
				<TabNavigation />
			</body>
		</html>
	);
}
