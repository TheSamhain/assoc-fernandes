import React from 'react';
import AssocLogoDark from '../../assets/images/logo-karate-dark.png';
import AssocLogoLight from '../../assets/images/logo-karate.png';
import Image from 'next/image';
import styles from './Header.module.css';
import { useTheme } from '@mui/material';

function Header() {
	const theme = useTheme();

	return (
		<header className={styles.header}>
			<Image
				alt='Logo Associação Fernandes'
				src={theme.palette.mode == 'dark' ? AssocLogoDark : AssocLogoLight}
				className={styles.logo}
			/>
			<h1 className={styles.title}>
				Associação Fernandes de
				<br />
				KARATÊ-DO
			</h1>
		</header>
	);
}

export default Header;
