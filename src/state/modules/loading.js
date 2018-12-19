import { combineReducers } from 'redux';

import { actions as electionActions } from 'state/modules/election';

import { actions as authActions } from 'state/modules/auth';

import { actions as unitActions } from 'state/modules/unit';

import { actions as userActions } from 'state/modules/user';

/**
 * Utility function to making a simple reducer to swap the loading indicator status.
 *
 * @param {String} request - The request constant to use
 * @param {String} success - The success constant to use
 * @param {String} failure - The failure constant to use
 * @return {function} a reducer
 */
export function makeReducer(request, success, failure) {
  return function reducer(state = false, action) {
    if (action.type === request) {
      return true;
    }
    if (action.type === success || action.type === failure) {
      return false;
    }
    return state;
  };
}

/**
 * Utility function to create a reducer that listens to mutliple actions and
 * swap loading indicator status
 *
 * @param  {Array.String} startActions - Actions that intiate loading
 * @param  {Array.String} finishActions - Actions that stop loading
 * @return {Function}
 */
export function makeMultiActionReducer(startActions, finishActions) {
  let counter = 0;
  return function reducer(state = false, action) {
    if (startActions.indexOf(action.type) !== -1) {
      counter += 1;
    } else if (finishActions.indexOf(action.type) !== -1 && counter > 0) {
      counter -= 1;
    } else {
      return state;
    }
    return counter > 0;
  };
}

export default combineReducers({
  election: makeMultiActionReducer(
    [
      electionActions.list.request,
      electionActions.create.request,
      electionActions.update.request,
      electionActions.get.request,
    ],
    [
      electionActions.list.success,
      electionActions.create.success,
      electionActions.update.success,
      electionActions.get.success,
    ],
    [
      electionActions.list.failure,
      electionActions.create.failure,
      electionActions.update.failure,
      electionActions.get.failure,
    ]
  ),
  user: makeMultiActionReducer(
    [
      userActions.list.request,
      userActions.create.request,
      userActions.update.request,
      userActions.get.request,
    ],
    [
      userActions.list.success,
      userActions.create.success,
      userActions.update.success,
      userActions.get.success,
    ],
    [
      userActions.list.failure,
      userActions.create.failure,
      userActions.update.failure,
      userActions.get.failure,
    ]
  ),
  auth: makeMultiActionReducer(
    [authActions.register.request, authActions.login.request],
    [authActions.register.success, authActions.login.success],
    [authActions.register.failure, authActions.login.failure]
  ),
  unit: makeMultiActionReducer(
    [
      unitActions.list.request,
      unitActions.update.request,
      unitActions.get.request,
      unitActions.create.request,
    ],
    [
      unitActions.list.success,
      unitActions.update.success,
      unitActions.get.success,
      unitActions.create.success,
    ],
    [
      unitActions.list.failure,
      unitActions.update.failure,
      unitActions.get.failure,
      unitActions.create.failure,
    ]
  ),
});
