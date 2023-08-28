interface KataProps {
  nome: string;
  video: string;
}

interface KyuProps {
  kyu: number;
  faixa: string;
  cor: string;
  fontDark?: boolean;
  pontaPreta?: boolean;

  katas: KataProps[];
}

export interface FaixaGroupProps {
  kyu: KyuProps;
}
