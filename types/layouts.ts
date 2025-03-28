export interface Layout {
  id: string;
  name: string;
  media: Media[];
}

export interface Media {
  id: string;
  type: 'image' | 'video';
  src: string;
  duration: number;
}
