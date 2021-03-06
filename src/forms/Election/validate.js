import isEqual from 'date-fns/isEqual';

const validate = values => {
  const errors = {};

  values.requestedDates.forEach((date, i) => {
    const prevDate = values.requestedDates[i - 1];
    if (prevDate && isEqual(date, prevDate)) {
      errors.requestedDates = 'All dates must be unique';
    }
  });

  if (values.requestedDates.length < 3) {
    errors.requestedDates = 'You must provide at least 3 dates.';
  }

  return errors;
};

export default validate;
