'use client';
import { Chip, useTheme } from '@mui/material';
import React from 'react';
import styles from './faixaGroup.module.css';
import KataVideo from '../KataVideo';

interface KataProps {
	nome: string;
	video: string;
}

interface KyuProps {
	kyu: number;
	faixa: string;
	cor: string;
	fontDark?: boolean;
	pontaPreta?: boolean;

	katas: KataProps[];
}

interface FaixaGroupProps {
	kyu: KyuProps;
}

const FaixaGroup: React.FC<FaixaGroupProps> = ({ kyu }) => {
	const theme = useTheme();

	return (
		<div className={styles.kyuContainer}>
			<Chip
				label={kyu.faixa}
				sx={{
					backgroundColor: kyu.cor,
					color: kyu.fontDark
						? theme.palette.background.default
						: theme.palette.text.primary,
				}}
			/>

			<ul className={styles.katList}>
				{kyu.katas.map((kata) => (
					<KataVideo kata={kata} cor={kyu.cor} key={kata.nome} />
				))}
			</ul>
		</div>
	);
};

export default FaixaGroup;
