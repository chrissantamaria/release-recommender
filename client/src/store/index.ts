import withImmer from './utils/withImmer';
import createStore from 'zustand';
import { persist } from 'zustand/middleware';
import { addSeconds, isPast } from 'date-fns';
import axios from 'axios';
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
      addToQueue: (id) =>
        set((draft) => {
          const set = new Set(original(draft.queue));
          set.add(id);
          draft.queue = Array.from(set);
        }),
      removeFromQueue: (id) =>
        set((draft) => {
          const set = new Set(original(draft.queue));
          set.delete(id);
          draft.queue = Array.from(set);
        }),
    })),
    {
      name: 'spotify',
    }
  )
);

export default useStore;
