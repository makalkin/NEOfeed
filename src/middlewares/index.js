/* eslint-disable no-continue */
import { ROUTING } from '../actions/types';

const WAIT_FOR_ACTION = Symbol('WAIT_FOR_ACTION');
const ERROR_ACTION = Symbol('ERROR_ACTION');

export const redirectMiddleware = history => () => next => (action) => {
  if (action.type === ROUTING) {
    history[action.payload.method](action.payload.nextUrl);
  }
  return next(action);
};

export const reduxWaitForMiddleware = () => {
  const pendingActionList = [];
  const promisesList = [];
  const getPromisesList = () => promisesList;

  const middleware = next => (action) => {
    for (let i = pendingActionList.length - 1; i >= 0; i -= 1) {
      const pendingActionInfo = pendingActionList[i];

      if (pendingActionInfo.isSuccessAction(action)) {
        pendingActionInfo.resolveCallback(action.payload || action.data || {});
      } else if (pendingActionInfo.isErrorAction(action)) {
        pendingActionInfo.rejectCallback(action.error || action.err || new Error('action.error not specified.'));
      } else {
        continue;
      }

      pendingActionList.splice(pendingActionList.indexOf(pendingActionInfo), 1);
    }

    if (!action[WAIT_FOR_ACTION]) {
      return next(action);
    }

    const successAction = action[WAIT_FOR_ACTION];
    const errorAction = action[ERROR_ACTION];

    const newPendingActionInfo = {};

    if (typeof successAction === 'function') {
      newPendingActionInfo.isSuccessAction = successAction;
    } else {
      newPendingActionInfo.isSuccessAction = ({ type }) => type === successAction;
    }

    if (errorAction) {
      if (typeof errorAction === 'function') {
        newPendingActionInfo.isErrorAction = errorAction;
      } else {
        newPendingActionInfo.isErrorAction = ({ type }) => type === errorAction;
      }
    } else {
      newPendingActionInfo.isErrorAction = () => false;
    }

    const promise = new Promise((resolve, reject) => {
      newPendingActionInfo.resolveCallback = resolve;
      newPendingActionInfo.rejectCallback = reject;
    });

    pendingActionList.push(newPendingActionInfo);
    promisesList.push(promise);

    next(action);
    return promise;
  };

  return Object.assign(middleware, { getPromisesList });
};

export { WAIT_FOR_ACTION, ERROR_ACTION };
