import { ROUTING } from './types';

/**
 * Begin the auth process.
 * @param  {string} to  Next url.
 * @param  {*} [payload] Conditional fields like 'method' etc.
 * @return FluxStandardAction
 */
export function replaceRoute(to, payload) {
  return {
    type: ROUTING,
    payload: {
      method: 'replace',
      nextUrl: to,
      ...payload,
    },
  };
}

export { ROUTING };
