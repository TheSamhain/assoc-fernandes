export interface KataVideoProps {
  uuid?: string;
  nome: string;
  video: string;
}

export interface KatasProps {
  kyu: number;
  videos: KataVideoProps[];
}
