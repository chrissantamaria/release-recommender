import withImmer from '../utils/withImmer';
import createStore from 'zustand';

import { State } from './types';

const useSpotifyStore = createStore<State>(
  withImmer((set, get) => ({
    accessToken: null,
    refreshToken: null,
    handlePostLogin: (payload) =>
      set((draft) => {
        draft.accessToken = payload.accessToken;
        draft.refreshToken = payload.refreshToken;
      }),
    getProfileData: async () => {
      const { accessToken } = get();
      if (!accessToken) {
        throw new Error('No access token set');
      }

      const data = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => res.json());

      return data;
    },
  }))
);

export default useSpotifyStore;
