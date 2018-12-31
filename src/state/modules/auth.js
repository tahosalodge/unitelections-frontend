import { call, put, takeLatest } from 'redux-saga/effects';
import apiRequest from 'utils/apiRequest';
import { addNotification } from 'state/modules/notification';
import history from 'utils/history';
import ReactGA from 'react-ga';

const initialState = {
  loggedIn: false,
  user: {},
  lodge: {},
};

export const actions = {
  register: {
    request: 'REGISTER_REQUEST',
    success: 'REGISTER_SUCCESS',
    failure: 'REGISTER_FAILURE',
  },
  login: {
    request: 'LOGIN_REQUEST',
    success: 'LOGIN_SUCCESS',
    failure: 'LOGIN_FAILURE',
  },
  logout: 'LOGOUT',
  resetPassword: {
    request: 'RESETPASS_REQUEST',
    success: 'RESETPASS_SUCCESS',
    failure: 'RESETPASS_FAILURE',
  },
};

export function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.login.success:
    case actions.register.success:
      return {
        loggedIn: true,
        user: payload.user,
        lodge: payload.lodge,
      };
    case actions.logout:
    case actions.resetPassword.success:
      return initialState;

    default:
      return state;
  }
}

export function login(payload) {
  return {
    type: actions.login.request,
    payload,
  };
}

function loginSuccess(payload) {
  return {
    type: actions.login.success,
    payload,
  };
}

function loginFailure(error) {
  return {
    type: actions.login.failure,
    error,
  };
}

export function logout() {
  return {
    type: actions.logout,
  };
}

export function register(payload) {
  return {
    type: actions.register.request,
    payload,
  };
}

function registerFailure(error) {
  return {
    type: actions.register.failure,
    error,
  };
}

export function resetPassword(payload) {
  return {
    type: actions.resetPassword.request,
    payload,
  };
}
function resetPasswordFailure(error) {
  return {
    type: actions.resetPassword.failure,
    error,
  };
}

function* registerSaga({ payload }) {
  try {
    const response = yield call(
      apiRequest,
      '/v1/user/register',
      'POST',
      payload
    );
    localStorage.setItem('token', response.user.token);
    yield put(loginSuccess(response));
    history.navigate('/units');
  } catch (error) {
    yield put(registerFailure(error));
    yield put(
      addNotification({
        message: error.message,
        options: {
          variant: 'error',
        },
      })
    );
  }
}

function* loginSaga({ payload }) {
  try {
    const response = yield call(apiRequest, '/v1/user/login', 'POST', payload);
    localStorage.setItem('token', response.user.token);
    yield put(loginSuccess(response));
    history.navigate('/');
  } catch (error) {
    yield put(loginFailure(error));
    yield put(
      addNotification({
        message: error.message,
        options: {
          variant: 'error',
        },
      })
    );
  }
}

function* checkToken() {
  const { pathname } = window.location;
  try {
    if (pathname === '/logout') {
      return;
    }
    if (!localStorage.getItem('token')) {
      throw new Error('No token found.');
    }
    yield put(
      addNotification({ message: 'Welcome back! Logging you in now...' })
    );
    const response = yield call(apiRequest, '/v1/user/verify');
    localStorage.setItem('token', response.user.token);
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginFailure(error.message));
    if (error.code !== 'NETWORK') {
      localStorage.removeItem('token');
    }
    if (
      pathname.indexOf('register') === -1 &&
      pathname !== '/' &&
      pathname.indexOf('reset-password') === -1
    ) {
      history.navigate('/login');
    }
  }
}

function* logoutSaga() {
  try {
    yield localStorage.removeItem('token');
  } catch (error) {
    console.error(error);
  }
}

function* resetPasswordSaga({ payload }) {
  try {
    yield call(apiRequest, '/v1/user/reset-password', 'POST', payload);
    yield put(login({ email: payload.email, password: payload.password }));
    ReactGA.event({
      category: 'User',
      action: 'Reset password',
    });
  } catch (error) {
    yield put(resetPasswordFailure(error));
    yield put(
      addNotification({
        message: error.message,
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* saga() {
  yield checkToken();
  yield takeLatest(actions.register.request, registerSaga);
  yield takeLatest(actions.login.request, loginSaga);
  yield takeLatest(actions.logout, logoutSaga);
  yield takeLatest(actions.resetPassword.request, resetPasswordSaga);
}
