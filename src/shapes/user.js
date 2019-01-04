import { shape, bool, string, arrayOf } from 'prop-types';

export const relationshipShape = shape({
  organization: string,
  model: string,
  canManage: bool,
});

const userShape = shape({
  _id: string,
  fname: string,
  lname: string,
  phone: string,
  email: string,
  password: string,
  belongsTo: arrayOf(relationshipShape),
  isAdmin: bool,
});

export default userShape;
