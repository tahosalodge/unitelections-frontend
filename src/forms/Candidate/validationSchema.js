import { object, string } from 'yup';

export default object().shape({
  fname: string().required(),
  lname: string().required(),
  dob: string().required(),
  bsaid: string().required(),
  rank: string().required(),
  address: object().shape({
    address1: string().required(),
    city: string().required(),
    state: string().required(),
    zip: string().required(),
  }),
  parentPhone: string().required(),
  parentEmail: string()
    .email()
    .required(),
  youthPhone: string(),
  youthEmail: string().email(),
});
