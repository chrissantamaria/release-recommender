type Credentials = {
  accessToken: null | string;
  refreshToken: null | string;
  expiresAt: null | string;
  queue: string[];
};

export type State = Credentials & {
  handlePostLogin: (params: URLSearchParams) => void;
  checkAccessToken: () => Promise<void>;
  logout: () => void;
  addToQueue: (id: string) => void;
  removeFromQueue: (id: string) => void;
};
