import { Track } from "./Track";

export type Playlist = {
  id: string;
  name: string;
  description: string;
  tracks: Track[];
};
