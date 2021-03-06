import { combineReducers } from 'redux';
import { reducer as lodge } from './modules/lodge';
import { reducer as user } from './modules/user';
import { reducer as notification } from './modules/notification';
import { reducer as auth } from './modules/auth';
import { reducer as unit } from './modules/unit';
import { reducer as election } from './modules/election';
import { reducer as candidate } from './modules/candidate';
import { reducer as nomination } from './modules/nomination';
import loading from './modules/loading';

const appReducer = combineReducers({
  lodge,
  user,
  notification,
  auth,
  unit,
  election,
  candidate,
  nomination,
  loading,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return appReducer({}, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
