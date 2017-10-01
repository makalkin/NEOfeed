/**
 * @typedef {object} FluxStandardAction
 * @property {(Symbol|string)} type - action type.
 * @property {*} [payload] - useful data.
 * @property {?boolean} [error] - indicates if payload should be considered as error.
 * @property {*} [meta] - extra data.
 */

/**
 * @typedef {object} FluxAlmostStandardAction
 * @property {(Symbol|string)[]} types - actions to be dispatched in async calls.
 * @property {(Symbol|string)} [type] - action type.
 * @property {*} [payload] - useful data.
 * @property {?boolean} [error] - indicates if payload should be considered as error.
 * @property {*} [meta] - extra data.
 */

/**
 * Action creator for routing.
 *
 * @param to  Next url.
 * @param payload Conditional fields like 'method' etc.
 * @returns FluxStandardAction
 */
