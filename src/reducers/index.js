import { combineReducers } from 'redux-immutable';

import routerReducer from './router';
import neo from './neo';

const rootReducer = asyncReducers =>
  combineReducers({
    router: routerReducer,
    neo,
    ...asyncReducers,
  });

export default rootReducer;
