import get from 'lodash/get';

export const selectElections = state => Object.values(state.election.items);
export const selectElection = (state, { electionId }) =>
  get(state, ['election', 'items', electionId], null);
