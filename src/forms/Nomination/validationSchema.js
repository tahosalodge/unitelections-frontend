import { object, string } from 'yup';

export default object().shape({
  fname: string().required(),
  lname: string().required(),
  dob: string().required(),
  bsaid: string().required(),
  address: object().shape({
    address1: string().required(),
    city: string().required(),
    state: string().required(),
    zip: string().required(),
  }),
  phone: string().required(),
  email: string()
    .email()
    .required(),
});
