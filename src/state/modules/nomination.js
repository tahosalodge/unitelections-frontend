import { put, call, takeLatest } from 'redux-saga/effects';
import createActions from 'utils/createAction';
import createReducer from 'utils/createReducer';
import apiRequest from 'utils/apiRequest';
import normalize from 'utils/normalize';
import { errorNotification } from 'state/modules/notification';
import history from 'utils/history';
import ReactGA from 'react-ga';

export const actions = createActions('NOMINATION');

const initialState = {
  items: {},
};

export const reducer = createReducer(actions, initialState);

export const createNomination = payload => ({
  type: actions.create.request,
  payload,
});

const createSuccess = nomination => ({
  type: actions.create.success,
  payload: {
    item: nomination,
  },
});

const createFailure = error => ({
  type: actions.create.failure,
  payload: {
    error,
  },
});

export const listNominations = () => ({
  type: actions.list.request,
});

export const listSuccess = nominations => ({
  type: actions.list.success,
  payload: {
    items: normalize(nominations, '_id'),
  },
});

const listFailure = error => ({
  type: actions.list.failure,
  payload: {
    error,
  },
});

export const getNomination = nominationId => ({
  type: actions.get.request,
  payload: {
    nominationId,
  },
});

const getSuccess = nomination => ({
  type: actions.get.success,
  payload: {
    item: nomination,
  },
});

const getFailure = error => ({
  type: actions.get.failure,
  payload: {
    error,
  },
});

export const updateNomination = payload => ({
  type: actions.update.request,
  payload,
});

const updateSuccess = nomination => ({
  type: actions.update.success,
  payload: {
    item: nomination,
  },
});

const updateFailure = error => ({
  type: actions.update.failure,
  payload: {
    error,
  },
});

export const deleteNomination = id => ({
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
    const { nomination } = yield call(apiRequest, '/v1/nomination', 'POST', {
      ...payload,
    });
    yield put(createSuccess(nomination));
    ReactGA.event({
      category: 'Nomination',
      action: 'Created',
    });
    history.navigate(`/elections/${nomination.election}/nominations`);
  } catch (error) {
    yield put(createFailure(error));
    yield put(errorNotification(error));
  }
}

function* get({ payload: { nominationId } }) {
  try {
    const { nomination } = yield call(
      apiRequest,
      `/v1/nomination/${nominationId}`
    );
    yield put(getSuccess(nomination));
  } catch (error) {
    yield put(getFailure(error));
    yield put(errorNotification(error));
  }
}

function* update({ payload: { id, patch } }) {
  try {
    const { nomination } = yield call(
      apiRequest,
      `/v1/nomination/${id}`,
      'PATCH',
      patch
    );
    yield put(updateSuccess(nomination));
  } catch (error) {
    yield put(updateFailure(error));
    yield put(errorNotification(error));
  }
}

function* remove({ payload: { id } }) {
  try {
    yield call(apiRequest, `/v1/nomination/${id}`, 'DELETE');
    yield put(deleteSuccess(id));
  } catch (error) {
    yield put(deleteFailure(error));
    yield put(errorNotification(error));
  }
}

function* list() {
  try {
    const { nominations } = yield call(apiRequest, '/v1/nomination');
    yield put(listSuccess(nominations));
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
