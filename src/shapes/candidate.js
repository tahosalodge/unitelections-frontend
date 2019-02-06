import { shape, arrayOf } from 'prop-types';

export const candidateShape = shape({});

export const arrayOfCandidates = arrayOf(candidateShape);
