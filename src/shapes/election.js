import { shape, arrayOf } from 'prop-types';

export const electionShape = shape({});

export const arrayOfElections = arrayOf(electionShape);

export default electionShape;
