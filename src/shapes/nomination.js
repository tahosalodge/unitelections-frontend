import { shape, arrayOf } from 'prop-types';

export const nominationShape = shape({});

export const arrayOfNominations = arrayOf(nominationShape);
