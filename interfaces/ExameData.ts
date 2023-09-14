import { KyuProps } from './KyuProps';

interface ItemData {
  descricao: string;
  nome: string;
}

export interface ExameData {
  bunkai: string[];
  geri: ItemData[];
  kata: string[];
  kyu: number;
  tsuki: ItemData[];
  uke: ItemData[];
}

export interface ExameAndKyuProps extends KyuProps, ExameData {}
