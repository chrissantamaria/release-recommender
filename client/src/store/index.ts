import withImmer from './utils/withImmer';
import createStore from 'zustand';
import { persist } from 'zustand/middleware';
import { addSeconds, isPast } from 'date-fns';
import axios from 'axios';
import unionBy from 'lodash/unionBy';
import { original } from 'immer';

import { State } from './types';

const parseExpiresIn = (expiresIn: number) =>
  addSeconds(new Date(), expiresIn).toISOString();

const useStore = createStore<State>(
  persist(
    withImmer((set, get) => ({
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      queue: [],
      // TODO: handle missing query params
      handlePostLogin: (params) =>
        set((draft) => {
          draft.accessToken = params.get('access_token');
          draft.refreshToken = params.get('refresh_token');
          draft.expiresAt = parseExpiresIn(
            Number.parseInt(params.get('expires_in') || '3600')
          );
        }),
      logout: () =>
        set((draft) => {
          draft.accessToken = null;
          draft.refreshToken = null;
          draft.expiresAt = null;
          draft.queue = [];
        }),
      checkAccessToken: async () => {
        const { refreshToken, expiresAt } = get();
        if (!expiresAt) {
          throw new Error('No expiresAt value set');
        }

        if (isPast(new Date(expiresAt))) {
          if (!refreshToken) {
            throw new Error('No refreshToken value set');
          }

          const { data } = await axios.get(
            `/api/spotify_refresh?refreshToken=${refreshToken}`
          );

          set((draft) => {
            draft.accessToken = data.access_token;
            draft.expiresAt = parseExpiresIn(data.expires_in);
          });
        }
      },
      addToQueue: (track) =>
        set((draft) => {
          draft.queue = unionBy(original(draft.queue), [track], 'id');
        }),
      removeFromQueue: ({ id }) =>
        set((draft) => {
          draft.queue = draft.queue.filter((track) => track.id !== id);
        }),
    })),
    {
      name: 'spotify',
    }
  )
);

export default useStore;
export * from './types';
