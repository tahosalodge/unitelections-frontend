export const selectUnitsForDropdown = state =>
  Object.values(state.unit.items).map(unit => ({
    label: `${unit.unitType} ${unit.number}`,
    value: unit._id,
  }));

export const selectElectionsForDropdown = state =>
  Object.values(state.election.items).map(election => election._id);

export const selectChaptersForDropdown = state =>
  Object.values(state.auth.lodge.chapters).map(chapter => ({
    label: chapter.name,
    value: chapter._id,
  }));

export const selectItemsForModel = (model, options) =>
  options[`${model.toLowerCase()}s`] || [];
