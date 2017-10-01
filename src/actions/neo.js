import { ActionCreator } from '../libs/ApiActions/createApiActions';
import { getNeoFeed } from '../api';
import { NEO } from './types';

export const NeoActions = {
  getNeoFeed: new ActionCreator(NEO.GET_NEOS, getNeoFeed),

  START_FEED: 'START_FEED',
  STOP_FEED: 'STOP_FEED',

  GET_NEOS_FOR_DAY: 'GET_NEOS_FOR_DAY',

  SHOW_NEXT_DAY: 'SHOW_NEXT_DAY',

  showNextDay(payload) {
    return {
      type: this.SHOW_NEXT_DAY,
      payload,
    };
  },

  getNeosForDay(day) {
    return {
      type: this.GET_NEOS_FOR_DAY,
      payload: {
        day,
      },
    };
  },

  startFeed(startDate) {
    return {
      type: this.START_FEED,
      payload: {
        startDate,
      },
    };
  },

  stopFeed() {
    return {
      type: this.STOP_FEED,
    };
  },
};
