import * as yup from 'yup';

export default yup.object().shape({
  number: yup.string().required(),
  unitType: yup.string().required(),
  chapter: yup.string().required(),
  activeMembers: yup.string().required(),
  meetingLocation: yup.object().shape({
    address1: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
    notes: yup.string(),
  }),
  meetingTime: yup.string().required(),
  unitLeader: yup.object().shape({
    fname: yup.string().required(),
    lname: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().required(),
  }),
  adultRepresentative: yup.object().shape({
    fname: yup.string(),
    lname: yup.string(),
    phone: yup.string(),
    email: yup.string(),
  }),
  youthRepresentative: yup.object().shape({
    fname: yup.string(),
    lname: yup.string(),
    phone: yup.string(),
    email: yup.string(),
  }),
});
