import produce from 'immer';
import { State, StateCreator } from 'zustand';

// From https://github.com/pmndrs/zustand#middleware
const withImmer = <T extends State>(
  config: StateCreator<T, (fn: (draft: T) => void) => void>
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn) as (state: T) => T), get, api);

export default withImmer;
