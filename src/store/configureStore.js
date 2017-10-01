import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createBrowserHistory from 'history/createBrowserHistory';
import Immutable from 'immutable';

import { redirectMiddleware, reduxWaitForMiddleware } from '../middlewares';
import createReducer from '../reducers';
import { injectSagas } from '../sagas';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  routerMiddleware(history),
  redirectMiddleware(history),
  sagaMiddleware,
  reduxWaitForMiddleware,
];

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
);

export default (initialState = Immutable.Map()) => {
  const store = createStore(
    createReducer(),
    initialState,
    enhancer,
  );

  store.asyncReducers = {}; // Async reducer registry

  injectSagas(sagaMiddleware);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      import('../reducers').then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);
        store.replaceReducer(nextReducers);
      });
    });
  }

  return store;
};
