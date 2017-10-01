import Immutable from 'immutable';
import { NeoActions } from '../actions/neo';

const initialState = Immutable.fromJS({
  days: {},
  activeDays: [],
  dayToFetch: null,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case NeoActions.START_FEED:
      return state.set('dayToFetch', action.payload.startDate);

    case NeoActions.SHOW_NEXT_DAY:
      return state
        .set('dayToFetch', action.payload.dayToFetch)
        .set('activeDays', Immutable.List(action.payload.activeDays));
    case NeoActions.getNeoFeed.types.SUCCESS:
      return state.update('days', days => days.concat(action.payload.near_earth_objects));
    default:
      return state;
  }
};

export { initialState };
