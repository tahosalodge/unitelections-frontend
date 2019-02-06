export const selectCandidates = state => Object.values(state.candidate.items);

export const selectCandidate = (state, { candidateId }) =>
  state.candidate[candidateId];
