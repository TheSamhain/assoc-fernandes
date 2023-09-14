import { KyuProps } from './KyuProps';

interface ItemData {
  descricao: string;
  nome: string;
}

export interface ExameData {
  kyu: number;
  kata: string[];
  geri: ItemData[];
}

export interface ExameAndKyuProps extends KyuProps, ExameData {}
