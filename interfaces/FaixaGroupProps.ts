import { KyuProps } from './KyuProps';

interface KataProps {
  nome: string;
  video: string;
}

export interface FaixaGroupProps extends KyuProps {
  videos: KataProps[];
}
