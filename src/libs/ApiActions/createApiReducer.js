import Immutable from 'immutable';

import { ActionCreator } from './createApiActions';

const initialState = Immutable.fromJS({
  isLoading: false,
  error: null,
  data: null,
});

export const createApiReducer = (prefix) => {
  const types = ActionCreator.createActionsTypes(prefix);

  return (state = initialState, action) => {
    switch (action.type) {
      case types.REQUEST:
        return state
          .set('error', null)
          .set('isLoading', true);
      case types.SUCCESS:
        return state
          .set('error', null)
          .set('data', action.payload)
          .set('isLoading', false);
      case types.FAIL:
        return state
          .set('error', action.payload)
          .set('isLoading', false);
      case types.RESET:
        return state
          .set('error', null)
          .set('data', null)
          .set('isLoading', false);
      default:
        return state;
    }
  };
};
