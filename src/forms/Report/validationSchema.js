import { object, string, array } from 'yup';

export default object().shape({
  youthAttendance: string().required(),
  election1Ballots: string().required(),
  election2Ballots: string(),
  electionTeam: array().of(
    object().shape({
      name: string().required(),
      age: string().required(),
    })
  ),
});
