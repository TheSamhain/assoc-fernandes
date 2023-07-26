import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: 'Associação Fernandes de Karatê-do',
  description: 'Site para Associação Fernandes de Karatê',
  keywords: ['karatê-do', 'luta', 'academia'],
  authors: [{ name: 'Leonardo Noro Pereira', url: 'https://leonardonoro.com.br' }],
  manifest: './manifest.json',
  colorScheme: 'dark light',
  applicationName: 'Assoc. Fernandes Karatê',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};
