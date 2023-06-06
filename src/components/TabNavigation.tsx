'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import HomeIcon from '@mui/icons-material/Home';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import MenuIcon from '@mui/icons-material/Menu';

function TabNavigation() {
	const pathName = usePathname();
	const [currentPath, setCurrentPath] = useState(pathName);

	const tabs = [
		{ title: 'Home', path: '/', icon: <HomeIcon /> },
		{ title: 'Katas/Faixas', path: '/katasfaixas', icon: <SportsMartialArtsIcon /> },
		{ title: 'Galeria', path: '/galeria', icon: <PhotoLibraryIcon /> },
		{ title: 'Menu', path: '/menu', icon: <MenuIcon /> },
	];

	return (
		<BottomNavigation
			showLabels
			value={currentPath}
			onChange={(event, newPath) => setCurrentPath(newPath)}
		>
			{tabs.map((tab, index) => (
				<BottomNavigationAction
					label={tab.title}
					icon={tab.icon}
					key={tab.title + index}
					value={tab.path}
					href={tab.path}
				/>
			))}
		</BottomNavigation>
	);
}

export default TabNavigation;
