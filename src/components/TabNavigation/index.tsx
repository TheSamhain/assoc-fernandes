'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './TabNavigation.module.css';
import { usePathname } from 'next/navigation';
import { log } from 'console';

function TabNavigation() {
	const pathname = usePathname();

	const tabs = [
		{ title: 'Home', path: '/', icon: 'home' },
		{ title: 'Faixas', path: '/faixas', icon: 'faixa' },
		{ title: 'Galeria', path: '/galeria', icon: 'galeria' },
		{ title: 'Menu', path: '/menu', icon: 'menu' },
	];

	return (
		<nav className={styles.navBar}>
			{tabs.map((tab, index) => {
				const selected = pathname == tab.path;

				return (
					<Link
						key={tab.title + index}
						href={tab.path}
						className={selected ? styles.tabSelected : styles.tab}
					>
						<Image
							width={32}
							height={32}
							className={styles.tabIcon}
							alt={tab.title}
							src={`./icons/${tab.icon}${selected ? '' : '-vazado'}.svg`}
						/>
					</Link>
				);
			})}
		</nav>
	);
}

export default TabNavigation;
