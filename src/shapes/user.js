import { shape, bool, string } from 'prop-types';

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
  belongsTo: relationshipShape,
  isAdmin: bool,
});

export default userShape;
