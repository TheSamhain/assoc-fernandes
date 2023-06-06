'use client';
import React, { useMemo } from 'react';
import { Card, CardHeader, CardContent, Typography, CardMedia } from '@mui/material';

interface EventoProps {
	data: string;
	descricao: string;
	galeriaLocal: string;
	fotos?: {
		qtde: number;
		extensao: string;
	}[];
	videos?: {
		qtde: number;
		extensao: string;
	}[];
	local: string;
	nome: string;
}

interface CardEventoProps {
	evento: EventoProps;
}

const CardEvento: React.FC<CardEventoProps> = ({ evento }) => {
	const fotos = useMemo(
		() =>
			evento.fotos?.map((foto) => {
				const fotos = [];

				for (let i = 1; i <= foto.qtde; i++) {
					fotos.push(
						<CardMedia
							component='img'
							image={evento.galeriaLocal + `foto (${i}).${foto.extensao}`}
							alt={`foto (${i}).${foto.extensao}`}
							key={`foto (${i})`}
							sx={{ marginBottom: 1 }}
						/>
					);
				}

				return fotos;
			}),
		[evento]
	);

	const videos = useMemo(
		() =>
			evento.videos?.map((video) => {
				const videos = [];

				for (let i = 1; i <= video.qtde; i++) {
					videos.push(
						<CardMedia
							component='video'
							image={evento.galeriaLocal + `video (${i}).${video.extensao}`}
							key={`video (${i})`}
							sx={{ marginBottom: 1 }}
							controls
						/>
					);
				}

				return videos;
			}),
		[evento]
	);

	return (
		<Card sx={{ maxWidth: 345, marginBottom: 1 }}>
			<CardHeader title={evento.nome} subheader={evento.local + ' ' + evento.data} />

			{fotos}
			{videos}

			<CardContent>
				<Typography variant='body2' color='text.secondary'>
					{evento.descricao}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default CardEvento;
