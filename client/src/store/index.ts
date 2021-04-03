import withImmer from './utils/withImmer';
import createStore from 'zustand';
import { persist } from 'zustand/middleware';
import { addSeconds, isPast } from 'date-fns';
import { uniqBy } from 'ramda';
import invariant from 'tiny-invariant';
import createValidator, { registerType } from 'typecheck.macro';

import { State } from './types';

type RefreshTokenResponse = {
  access_token: string;
  expires_in: number;
};

registerType('RefreshTokenResponse');
const validateRefreshTokenResponse = createValidator<RefreshTokenResponse>();

const parseExpiresIn = (expiresIn: number) =>
  addSeconds(new Date(), expiresIn).toISOString();

const INITIAL_STATE = {
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  queue: [],
};

const useStore = createStore<State>(
  persist(
    withImmer((set, get) => ({
      ...INITIAL_STATE,
      // TODO: handle missing query params
      handlePostLogin: (params) =>
        set((draft) => {
          draft.accessToken = params.get('access_token');
          draft.refreshToken = params.get('refresh_token');
          draft.expiresAt = parseExpiresIn(
            Number.parseInt(params.get('expires_in') || '3600')
          );
        }),
      logout: () => set(() => INITIAL_STATE),
      getFreshAccessToken: async () => {
        const { accessToken, refreshToken, expiresAt } = get();
        if (!expiresAt) {
          throw new Error('No expiresAt value set');
        }

        if (accessToken && !isPast(new Date(expiresAt))) {
          return accessToken;
        }

        if (!refreshToken) {
          throw new Error('No refreshToken value set');
        }

        const data = await fetch(
          `/api/spotify_refresh?refreshToken=${refreshToken}`
        ).then((res) => res.json());

        invariant(
          validateRefreshTokenResponse(data),
          '/api/spotify_refresh response did not match schema'
        );

        set((draft) => {
          draft.accessToken = data.access_token;
          draft.expiresAt = parseExpiresIn(data.expires_in);
        });

        return data.access_token;
      },
      addToQueue: (param) =>
        set((draft) => {
          const tracks = Array.isArray(param) ? param : [param];
          // TODO: can be replaced by custom lighterweight fn
          draft.queue = uniqBy((item) => item.id, [...draft.queue, ...tracks]);
        }),
      removeFromQueue: ({ id }) =>
        set((draft) => {
          draft.queue = draft.queue.filter((track) => track.id !== id);
        }),
      clearQueue: () =>
        set((draft) => {
          draft.queue = [];
        }),
    })),
    {
      name: 'spotify',
    }
  )
);

export default useStore;
export * from './types';
