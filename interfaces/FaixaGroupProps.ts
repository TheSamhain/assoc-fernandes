import { KyuProps } from './KyuProps';

interface VideoProps {
  nome: string;
  video: string;
}

export interface FaixaGroupProps extends KyuProps {
  videos: VideoProps[];
}
