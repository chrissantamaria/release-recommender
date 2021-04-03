import produce, { Draft } from 'immer';
import { State, StateCreator } from 'zustand';

// From https://github.com/pmndrs/zustand#middleware
const withImmer = <T extends State>(
  config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce<T>(fn)), get, api);

export default withImmer;
