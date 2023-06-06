import { defaultMetadata } from '@/utils/DefaultMetadata';
import Eventos from '@/assets/data/eventos.json';

export const metadata = defaultMetadata;

export default function Home() {
	return (
		<div>
			<h1>Eventos</h1>

			{Eventos.map((evento) => (
				<></>
			))}
		</div>
	);
}
