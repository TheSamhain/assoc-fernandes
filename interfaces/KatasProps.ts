interface VideoProps {
  nome: string;
  video: string;
}

export interface KatasProps {
  kyu: number;
  videos: VideoProps[];
}
