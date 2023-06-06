import styles from './KataVideo.module.css';

interface KataVideoProps {
	kata: {
		nome: string;
		video: string;
	};
	cor: string;
}

function KataVideo({ kata, cor }: KataVideoProps) {
	const { nome, video } = kata;

	const VideoComponent = () =>
		video.startsWith('http') ? (
			<iframe
				className={styles['kata-video-component']}
				width='500'
				height='300'
				src={video}
				title={nome}
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
				frameBorder='0'
				allowFullScreen
			></iframe>
		) : (
			<video width='500' height='300' controls className={styles['kata-video-component']}>
				<source src={kata.video} type='video/mp4'></source>
			</video>
		);

	return (
		<li
			className={styles['kata-item']}
			style={{
				borderColor: cor,
			}}
		>
			{video && <VideoComponent />}
			<span className={styles['kata-name']}>{nome}</span>
		</li>
	);
}

export default KataVideo;
