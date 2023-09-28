export interface KataVideoProps {
  nome: string;
  video: string;
}

export interface KatasProps {
  kyu: number;
  videos: KataVideoProps[];
}
