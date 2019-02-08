import get from 'lodash/get';

export const getUnits = state => Object.values(state.unit.items);

export const selectUnit = (state, { unitId }) =>
  get(state, ['unit', 'items', unitId], null);

export const selectUnitForElection = (state, election) =>
  election ? selectUnit(state, { unitId: election.unit }) : null;
