import { arrayOf, shape, string } from 'prop-types';

export const selectShape = shape({
  label: string,
  value: string,
});

export const arrayOfSelections = arrayOf(selectShape);

export const arrayOfStrings = arrayOf(string);
