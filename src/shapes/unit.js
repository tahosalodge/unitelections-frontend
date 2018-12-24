import { shape, number, string, arrayOf } from 'prop-types';

export const unitShape = shape({
  number: string,
  chapter: string,
  activeMembers: number,
  meetingLocation: {
    address1: string,
    city: string,
    state: string,
    zip: string,
    notes: string,
    meetingTime: string,
    unitLeader: shape({}),
    adultRepresentative: shape({}),
    youthRepresentative: shape({}),
    users: arrayOf(shape({})),
    pendingUsers: arrayOf(shape({})),
  },
});

export const arrayOfUnits = arrayOf(unitShape);

export default unitShape;
