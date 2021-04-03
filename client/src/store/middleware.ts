import produce, { Draft } from 'immer';
import { pipe } from 'ramda';
import create, { State, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

// From https://github.com/pmndrs/zustand#middleware
const withImmer = <T extends State>(
  config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce<T>(fn)), get, api);

const withPersist = <T extends State>(config: StateCreator<T>) =>
  persist(config, { name: 'spotify' });

const createStore = pipe(withImmer, withPersist, create);

export default createStore;
