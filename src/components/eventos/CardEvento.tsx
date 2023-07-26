'use client';
import React, { useMemo } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardMedia,
  Stack,
  ImageList,
  ImageListItem,
} from '@mui/material';

interface EventoProps {
  data: string;
  descricao: string;
  galeriaLocal: string;
  fotos?: {
    qtde: number;
    extensao: string;
  };
  videos?: {
    qtde: number;
    extensao: string;
  };
  local: string;
  nome: string;
}

interface CardEventoProps {
  evento: EventoProps;
}

const CardEvento: React.FC<CardEventoProps> = ({ evento }) => {
  const fotos = useMemo(() => {
    if (!evento.fotos) {
      return [];
    }

    const fotos = [];
    const maxFotos = evento.fotos.qtde > 3 ? 3 : evento.fotos.qtde;

    for (let i = 1; i <= maxFotos; i++) {
      fotos.push(
        <CardMedia
          component='img'
          image={evento.galeriaLocal + `foto (${i}).${evento.fotos.extensao}`}
          alt={`foto (${i}).${evento.fotos.extensao}`}
          key={`foto (${i})`}
          sx={{ marginBottom: 1 }}
        />
      );
    }

    if (evento.fotos.qtde > 3) {
      fotos.push(
        <div key={`foto (4)`} style={{ position: 'relative' }}>
          <CardMedia
            component='img'
            image={evento.galeriaLocal + `foto (4).${evento.fotos.extensao}`}
            alt={`foto (4).${evento.fotos.extensao}`}
            sx={{ marginBottom: 1 }}
          />

          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant='h4'>+{evento.fotos.qtde - 3}</Typography>
          </div>
        </div>
      );
    }

    return fotos;
  }, [evento]);

  return (
    <Card sx={{ maxWidth: 345, marginBottom: 1 }}>
      <CardHeader title={evento.nome} subheader={evento.local + ' ' + evento.data} />

      <ImageList cols={2} rowHeight={164} variant='masonry'>
        {fotos}
      </ImageList>

      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {evento.descricao}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardEvento;
