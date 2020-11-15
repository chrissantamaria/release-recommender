export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
};

type Credentials = {
  accessToken: null | string;
  refreshToken: null | string;
  expiresAt: null | string;
};

export type State = Credentials & {
  queue: Track[];
  handlePostLogin: (params: URLSearchParams) => void;
  checkAccessToken: () => Promise<void>;
  logout: () => void;
  addToQueue: (track: Track) => void;
  addMultipleToQueue: (tracks: Track[]) => void;
  removeFromQueue: (track: Track) => void;
  clearQueue: () => void;
};
