import addWeeks from 'date-fns/addWeeks';
import parse from 'date-fns/parse';

export const FIRST_ELECTION_DATE = parse(
  '01/01/2019',
  'MM/dd/yyyy',
  new Date()
);

export const minDate = addWeeks(Date.now(), 2);
