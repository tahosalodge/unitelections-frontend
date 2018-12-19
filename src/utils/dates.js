import addWeeks from 'date-fns/addWeeks';
import isBefore from 'date-fns/isBefore';
import parse from 'date-fns/parse';

export const FIRST_ELECTION_DATE = parse(
  '01/01/2019',
  'MM/dd/yyyy',
  new Date()
);

export const minDate = isBefore(Date.now(), FIRST_ELECTION_DATE)
  ? FIRST_ELECTION_DATE
  : addWeeks(Date.now(), 2);
