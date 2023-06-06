import React from 'react';
import FaixaGroup from './components/FaixaGroup';
import Kyus from '../../assets/data/kyus.json';
import { defaultMetadata } from '@/utils/DefaultMetadata';

export const metadata = defaultMetadata;

function KatasFaixas() {
	return (
		<div>
			<h1>Katas e Faixas</h1>

			{Kyus.map((kyu) => (
				<FaixaGroup kyu={kyu} key={kyu.faixa} />
			))}
		</div>
	);
}

export default KatasFaixas;
