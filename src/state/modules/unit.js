import { put, call, takeLatest } from 'redux-saga/effects';
import createActions from 'utils/createAction';
import createReducer from 'utils/createReducer';
import apiRequest from 'utils/apiRequest';
import normalize from 'utils/normalize';
import { addNotification } from 'state/modules/notification';
import history from 'utils/history';

export const actions = createActions('UNIT');

const initialState = {
  items: {},
};

export const reducer = createReducer(actions, initialState);

export const createUnit = payload => ({
  type: actions.create.request,
  payload,
});

const createSuccess = unit => ({
  type: actions.create.success,
  payload: {
    item: unit,
  },
});

const createFailure = error => ({
  type: actions.create.failure,
  payload: {
    error,
  },
});

export const listUnits = () => ({
  type: actions.list.request,
});

const listSuccess = units => ({
  type: actions.list.success,
  payload: {
    items: normalize(units, '_id'),
  },
});

const listFailure = error => ({
  type: actions.list.failure,
  payload: {
    error,
  },
});

export const getUnit = unitId => ({
  type: actions.get.request,
  payload: {
    unitId,
  },
});

const getSuccess = unit => ({
  type: actions.get.success,
  payload: {
    item: unit,
  },
});

const getFailure = error => ({
  type: actions.get.failure,
  payload: {
    error,
  },
});

export const updateUnit = payload => ({
  type: actions.update.request,
  payload,
});

const updateSuccess = unit => ({
  type: actions.update.success,
  payload: {
    item: unit,
  },
});

const updateFailure = error => ({
  type: actions.update.failure,
  payload: {
    error,
  },
});

export const deleteUnit = id => ({
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
    const { unit } = yield call(apiRequest, '/v1/unit', 'POST', payload);
    yield put(createSuccess(unit));
    history.navigate(`/units/${unit._id}/request-election`);
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

function* get({ payload: { unitId } }) {
  try {
    const { unit } = yield call(apiRequest, `/v1/unit/${unitId}`);
    yield put(getSuccess(unit));
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
    const { unit } = yield call(apiRequest, `/v1/unit/${id}`, 'PATCH', patch);
    yield put(updateSuccess(unit));
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
    yield call(apiRequest, `/v1/unit/${id}`, 'DELETE');
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
    const { units } = yield call(apiRequest, '/v1/unit');
    yield put(listSuccess(units));
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
