import { all } from 'redux-saga/effects';
import { saga as lodge } from './modules/lodge';
import { saga as user } from './modules/user';
import { saga as auth } from './modules/auth';
import { saga as unit } from './modules/unit';
import { saga as election } from './modules/election';
import { saga as candidate } from './modules/candidate';
import { saga as nomination } from './modules/nomination';

export default function* RootSaga() {
  yield all([
    lodge(),
    user(),
    auth(),
    unit(),
    election(),
    candidate(),
    nomination(),
  ]);
}
