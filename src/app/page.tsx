import { defaultMetadata } from '@/utils/DefaultMetadata';
import styles from './page.module.css';

export const metadata = defaultMetadata;

export default function Home() {
	return (
		<div className={styles.main}>
			<h1>Home</h1>
		</div>
	);
}
