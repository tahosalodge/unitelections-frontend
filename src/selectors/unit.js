import get from 'lodash/get';

export const getUnits = state => Object.values(state.unit.items);
export const selectUnit = (state, { unitId }) =>
  get(state, ['unit', 'items', unitId], null);
