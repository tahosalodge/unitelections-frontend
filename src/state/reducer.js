import { combineReducers } from 'redux';
import { reducer as lodge } from './modules/lodge';
import { reducer as user } from './modules/user';
import { reducer as notification } from './modules/notification';
import { reducer as auth } from './modules/auth';
import { reducer as unit } from './modules/unit';
import { reducer as election } from './modules/election';

const rootReducer = combineReducers({
  lodge,
  user,
  notification,
  auth,
  unit,
  election,
});

export default rootReducer;
