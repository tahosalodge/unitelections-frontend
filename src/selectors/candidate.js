export const selectCandidates = state => Object.values(state.candidate.items);

export const selectCandidatesForElection = (state, { electionId }) =>
  selectCandidates(state).filter(
    candidate => candidate.election === electionId
  );

export const selectCandidate = (state, { candidateId }) =>
  state.candidate[candidateId];
