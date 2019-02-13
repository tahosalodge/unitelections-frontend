import { put, call, takeLatest } from 'redux-saga/effects';
import createActions from 'utils/createAction';
import createReducer from 'utils/createReducer';
import apiRequest from 'utils/apiRequest';
import normalize from 'utils/normalize';
import { errorNotification } from 'state/modules/notification';
import history from 'utils/history';
import ReactGA from 'react-ga';

export const actions = createActions('CANDIDATE');

const initialState = {
  items: {},
};

export const reducer = createReducer(actions, initialState);

export const createCandidate = payload => ({
  type: actions.create.request,
  payload,
});

const createSuccess = candidate => ({
  type: actions.create.success,
  payload: {
    item: candidate,
  },
});

const createFailure = error => ({
  type: actions.create.failure,
  payload: {
    error,
  },
});

export const listCandidates = () => ({
  type: actions.list.request,
});

export const listSuccess = candidates => ({
  type: actions.list.success,
  payload: {
    items: normalize(candidates, '_id'),
  },
});

const listFailure = error => ({
  type: actions.list.failure,
  payload: {
    error,
  },
});

export const getCandidate = candidateId => ({
  type: actions.get.request,
  payload: {
    candidateId,
  },
});

const getSuccess = candidate => ({
  type: actions.get.success,
  payload: {
    item: candidate,
  },
});

const getFailure = error => ({
  type: actions.get.failure,
  payload: {
    error,
  },
});

export const updateCandidate = payload => ({
  type: actions.update.request,
  payload,
});

const updateSuccess = candidate => ({
  type: actions.update.success,
  payload: {
    item: candidate,
  },
});

const updateFailure = error => ({
  type: actions.update.failure,
  payload: {
    error,
  },
});

export const deleteCandidate = id => ({
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
    const { candidate } = yield call(apiRequest, '/v1/candidate', 'POST', {
      ...payload,
    });
    yield put(createSuccess(candidate));
    ReactGA.event({
      category: 'Candidate',
      action: 'Created',
    });
    history.navigate(`/elections/${candidate.election}/candidates`);
  } catch (error) {
    yield put(createFailure(error));
    yield put(errorNotification(error));
  }
}

function* get({ payload: { candidateId } }) {
  try {
    const { candidate } = yield call(
      apiRequest,
      `/v1/candidate/${candidateId}`
    );
    yield put(getSuccess(candidate));
  } catch (error) {
    yield put(getFailure(error));
    yield put(errorNotification(error));
  }
}

function* update({ payload: { id, patch } }) {
  try {
    const { candidate } = yield call(
      apiRequest,
      `/v1/candidate/${id}`,
      'PATCH',
      patch
    );
    yield put(updateSuccess(candidate));
  } catch (error) {
    yield put(updateFailure(error));
    yield put(errorNotification(error));
  }
}

function* remove({ payload: { id } }) {
  try {
    yield call(apiRequest, `/v1/candidate/${id}`, 'DELETE');
    yield put(deleteSuccess(id));
  } catch (error) {
    yield put(deleteFailure(error));
    yield put(errorNotification(error));
  }
}

function* list() {
  try {
    const { candidates } = yield call(apiRequest, '/v1/candidate');
    yield put(listSuccess(candidates));
  } catch (error) {
    yield put(listFailure(error));
    yield put(errorNotification(error));
  }
}

export function* saga() {
  yield takeLatest(actions.create.request, create);
  yield takeLatest(actions.list.request, list);
  yield takeLatest(actions.get.request, get);
  yield takeLatest(actions.update.request, update);
  yield takeLatest(actions.delete.request, remove);
}
