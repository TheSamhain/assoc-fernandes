import { defaultMetadata } from '@/utils/DefaultMetadata';
import Eventos from '@/assets/data/eventos.json';
import CardEvento from '@/components/eventos/CardEvento';
import styles from './page.module.css';

export const metadata = defaultMetadata;

export default function Home() {
	return (
		<div className={styles.page}>
			<h1>Eventos</h1>

			{Eventos.map((evento) => (
				<CardEvento key={evento.nome} evento={evento} />
			))}
		</div>
	);
}
