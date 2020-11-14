import withImmer from '../utils/withImmer';
import createStore from 'zustand';

import { State } from './types';

const useSpotifyStore = createStore<State>(
  withImmer((set) => ({
    accessToken: null,
    refreshToken: null,
    handlePostLogin: (payload) =>
      set((draft) => {
        draft.accessToken = payload.accessToken;
        draft.refreshToken = payload.refreshToken;
      }),
  }))
);

export default useSpotifyStore;
