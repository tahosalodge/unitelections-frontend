export const selectNominations = state => Object.values(state.nomination.items);

export const selectNominationsForElection = (state, { electionId }) =>
  selectNominations(state).filter(
    nomination => nomination.election === electionId
  );

export const selectNomination = (state, { nominationId }) =>
  state.nomination[nominationId];
