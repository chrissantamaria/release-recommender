type Credentials = {
  accessToken: null | string;
  refreshToken: null | string;
};

export type State = Credentials & {
  handlePostLogin: (payload: Credentials) => void;
  getProfileData: () => Promise<unknown>;
  logout: () => void;
};