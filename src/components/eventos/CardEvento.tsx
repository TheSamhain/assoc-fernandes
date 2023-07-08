'use client';
import React, { useMemo } from 'react';
import { Card, CardHeader, CardContent, Typography, CardMedia, Stack } from '@mui/material';

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
  }[];
  local: string;
  nome: string;
}

interface CardEventoProps {
  evento: EventoProps;
}

const CardEvento: React.FC<CardEventoProps> = ({ evento }) => {
  const fotos = useMemo(() => {
    if (!evento.fotos) {
      return null;
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

    return fotos;
  }, [evento]);

  return (
    <Card sx={{ maxWidth: 345, marginBottom: 1 }}>
      <CardHeader title={evento.nome} subheader={evento.local + ' ' + evento.data} />

      {fotos}

      {evento.fotos && evento.fotos.qtde > 3 && (
        <Typography>Mais {evento.fotos.qtde - 3} medias</Typography>
      )}

      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {evento.descricao}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardEvento;
