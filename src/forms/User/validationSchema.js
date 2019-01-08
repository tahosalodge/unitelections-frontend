import * as yup from 'yup';

export default yup.object().shape({
  fname: yup.string().required(),
  lname: yup.string().required(),
  phone: yup.string(),
  email: yup
    .string()
    .email()
    .required(),
});
