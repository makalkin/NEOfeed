import Immutable from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import routerReducer, { initialState } from '../router';

describe('Router reducer', () => {
  it('should return the initial state', () => {
    expect(routerReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOCATION_CHANGE', () => {
    expect(routerReducer(undefined, { type: LOCATION_CHANGE, payload: '/new-route' }))
      .toEqual(Immutable.fromJS({
        locationBeforeTransitions: '/new-route',
      }));
  });
});
