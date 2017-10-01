/* eslint-disable no-constant-condition, func-names */

import { take, put, fork, call, cancel, cancelled } from 'redux-saga/effects';

export const createApiSaga = (actionCreator, cancelActionTypes = []) => {
  function* apiRunner({ payload }) {
    try {
      const data = yield call(actionCreator.method, payload);
      yield put(actionCreator.success(data));
    } catch (error) {
      yield put(actionCreator.fail(error));
    } finally {
      if (yield cancelled()) {
        yield put(actionCreator.cancel());
      }
    }
  }

  function* apiFork() {
    while (true) {
      const action = yield take(actionCreator.types.REQUEST);
      const bgSyncTask = yield fork(apiRunner, action);
      const cancelAction = yield take([[...cancelActionTypes], ...actionCreator.typesList]);
      const canceled = cancelActionTypes.filter(a => cancelAction.type === a).length;
      if (canceled) {
        yield cancel(bgSyncTask);
      }
    }
  }

  return function* () {
    yield fork(apiFork);
  };
};
