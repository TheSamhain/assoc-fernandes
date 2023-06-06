import React from 'react';
import FaixaGroup from './components/FaixaGroup';
import Kyus from '../../assets/data/kyus.json';
import { defaultMetadata } from '@/utils/DefaultMetadata';

export const metadata = defaultMetadata;

function KatasFaixas() {
	return (
		<div>
			<h1>Katas e Faixas</h1>

			<FaixaGroup />
			<FaixaGroup />
		</div>
	);
}

export default KatasFaixas;
