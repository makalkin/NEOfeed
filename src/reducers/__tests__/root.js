import { createStore } from 'redux';
import createReducer from '..';

describe('Root reducer', () => {
  const store = createStore(createReducer());

  it('should return initial state', () => {
    expect(store.getState()).toBeDefined();
  });
});
