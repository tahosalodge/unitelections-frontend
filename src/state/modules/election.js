import { put, call, takeLatest } from 'redux-saga/effects';
import createActions from 'utils/createAction';
import createReducer from 'utils/createReducer';
import apiRequest from 'utils/apiRequest';
import normalize from 'utils/normalize';
import { addNotification } from 'state/modules/notification';

export const actions = createActions('ELECTION');

const initialState = {
  items: {},
};

export const reducer = createReducer(actions, initialState);

export const createElection = (payload, unitId) => ({
  type: actions.create.request,
  payload: {
    ...payload,
    unitId,
  },
});

const createSuccess = election => ({
  type: actions.create.success,
  payload: {
    item: election,
  },
});

const createFailure = error => ({
  type: actions.create.failure,
  payload: {
    error,
  },
});

export const listElections = () => ({
  type: actions.list.request,
});

const listSuccess = elections => ({
  type: actions.list.success,
  payload: {
    items: normalize(elections, '_id'),
  },
});

const listFailure = error => ({
  type: actions.list.failure,
  payload: {
    error,
  },
});

export const getElection = electionId => ({
  type: actions.get.request,
  payload: {
    electionId,
  },
});

const getSuccess = election => ({
  type: actions.get.success,
  payload: {
    item: election,
  },
});

const getFailure = error => ({
  type: actions.get.failure,
  payload: {
    error,
  },
});

export const updateElection = payload => ({
  type: actions.update.request,
  payload,
});

const updateSuccess = election => ({
  type: actions.update.success,
  payload: {
    item: election,
  },
});

const updateFailure = error => ({
  type: actions.update.failure,
  payload: {
    error,
  },
});

export const deleteElection = id => ({
  type: actions.delete.request,
  payload: { id },
});

const deleteSuccess = id => ({
  type: actions.delete.success,
  payload: {
    id,
  },
});

const deleteFailure = error => ({
  type: actions.delete.failure,
  payload: {
    error,
  },
});

function* create({ payload }) {
  try {
    const { election } = yield call(apiRequest, '/v1/election', 'POST', {
      ...payload,
    });
    yield put(createSuccess(election));
  } catch (error) {
    yield put(createFailure(error));
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

function* get({ payload: { electionId } }) {
  try {
    const { election } = yield call(apiRequest, `/v1/election/${electionId}`);
    yield put(getSuccess(election));
  } catch (error) {
    yield put(getFailure(error));
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

function* update({ payload: { id, patch } }) {
  try {
    const { election } = yield call(
      apiRequest,
      `/v1/election/${id}`,
      'PATCH',
      patch
    );
    yield put(updateSuccess(election));
  } catch (error) {
    yield put(updateFailure(error));
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

function* remove({ payload: { id } }) {
  try {
    yield call(apiRequest, `/v1/election/${id}`, 'DELETE');
    yield put(deleteSuccess(id));
  } catch (error) {
    yield put(deleteFailure(error));
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

function* list() {
  try {
    const { elections } = yield call(apiRequest, '/v1/election');
    yield put(listSuccess(elections));
  } catch (error) {
    yield put(listFailure(error));
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
  yield takeLatest(actions.create.request, create);
  yield takeLatest(actions.list.request, list);
  yield takeLatest(actions.get.request, get);
  yield takeLatest(actions.update.request, update);
  yield takeLatest(actions.delete.request, remove);
}
