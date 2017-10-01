import { REQUEST, SUCCESS, FAIL, RESET } from './constants';

export class ActionCreator {
  prefix;
  types;
  typesList = [];
  options = { apiAction: true };

  constructor(prefix, method) {
    this.method = method;
    this.prefix = prefix;
    this.types = ActionCreator.createActionsTypes(prefix);
    this.typesList = Object.values(this.types);
  }

  static createActionsTypes(prefix) {
    return {
      REQUEST: `${prefix}${REQUEST}`,
      SUCCESS: `${prefix}${SUCCESS}`,
      FAIL: `${prefix}${FAIL}`,
      RESET: `${prefix}${RESET}`,
    };
  }

  /**
   * REQUEST
   * @param  {Object} [data]
   * @param  {Symbol} [waitSuccess]
   * @param  {Symbol} [waitFail]
   * @param  {Object} [meta]
   * @return FluxStandardAction
   */
  request(data, waitSuccess, waitFail, meta) {
    const action = {
      ...this.options,
      type: this.types.REQUEST,
      payload: data,
      meta,
      error: false,
    };

    if (waitSuccess) {
      action[waitSuccess] = this.types.SUCCESS;
    }

    if (waitFail) {
      action[waitFail] = this.types.FAIL;
    }

    return action;
  }

  /**
   * SUCCESS
   * @param  {Object} [data]
   * @param  {Object} [meta]
   * @return FluxStandardAction
   */
  success(data, meta) {
    return {
      ...this.options,
      type: this.types.SUCCESS,
      payload: data,
      meta,
      error: false,
    };
  }

  /**
   * FAIL
   * @param  {Object} [error]
   * @return FluxStandardAction
   */
  fail(error) {
    return {
      ...this.options,
      type: this.types.FAIL,
      payload: error,
      error: true,
    };
  }

  /**
   * RESET
   * @return FluxStandardAction
   */
  reset() {
    return {
      ...this.options,
      type: this.types.RESET,
    };
  }
}
