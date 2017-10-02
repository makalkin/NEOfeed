import { actionChannel, call, put, select, take, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import _ from 'lodash';
import moment from 'moment';

import { NeoActions } from '../actions/neo';

import { getNeoState } from '../selectors/neo';

export function* fetchForWeek(startDate) {
  yield put(
    NeoActions.getNeoFeed.request({
      startDate,
    }),
  );
}

export function* neoRootSaga() {
  const channel = yield actionChannel(NeoActions.START_FEED);

  // fetch first week right away
  const { payload: { startDate } } = yield take(channel);
  yield call(fetchForWeek, startDate);

  while (startDate) {
    // Tick
    yield call(delay, 5000);

    const neoState = yield select(getNeoState);
    const { days, activeDays, dayToFetch } = neoState;

    let nextDay = dayToFetch.clone();

    if (nextDay.isSameOrAfter(moment())) {
      nextDay = startDate.clone();
    } else {
      nextDay.add(1, 'd');
    }
    if (activeDays.length >= 6) {
      activeDays.pop();
    }

    const key = dayToFetch.format('YYYY-MM-DD');
    activeDays.unshift({ day: key, neos: days[key] });

    yield put(NeoActions.showNextDay({ dayToFetch: nextDay.clone(), activeDays }));

    const lastFetchedDay =
      _.chain(days)
        .map((day, k) => moment(k))
        .sortBy(d => d)
        .last()
        .value() || dayToFetch;

    if (nextDay.add(3, 'd').isSameOrAfter(lastFetchedDay)) {
      yield fork(fetchForWeek, nextDay);
    }
  }
}
