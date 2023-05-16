import React from 'react';
import AssocLogo from '../../assets/images/logo-karate-dark.png';
import Image from 'next/image';
import styles from './Header.module.css';

function Header() {
	return (
		<header className={styles.header}>
			<Image alt='Logo Associação Fernandes' src={AssocLogo} className={styles.logo} />
			<h1 className={styles.title}>
				Associação Fernandes de
				<br />
				KARATÊ-DO
			</h1>
		</header>
	);
}

export default Header;
