import { LOCATION_CHANGE } from 'react-router-redux';
import { NeoActions } from '../actions/neo';
import { createApiSaga } from '../libs/ApiActions/createApiSaga';
import { neoRootSaga } from './neo';

export const injectSagas = (sagaMiddleware) => {
  sagaMiddleware.run(createApiSaga(NeoActions.getNeoFeed, [LOCATION_CHANGE]));

  sagaMiddleware.run(neoRootSaga);
};
