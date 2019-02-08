import React from 'react';
import PropTypes from 'prop-types';
import { FastField } from 'formik';
import { DatePicker } from 'material-ui-pickers';
import { zonedTimeToUtc } from 'date-fns-tz';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';

const makeHandleChange = (name, setFieldValue) => value => {
  setFieldValue(name, zonedTimeToUtc(value, 'America/Denver'));
};

const DateField = props => (
  <FastField
    {...props}
    render={({ field, form: { touched, errors, setFieldValue } }) => (
      <DatePicker
        {...field}
        {...props}
        showTodayButton
        maxDateMessage="Date must be less than today"
        leftArrowIcon={<ArrowLeft />}
        rightArrowIcon={<ArrowRight />}
        error={touched[field.name] && errors[field.name]}
        helperText={
          (touched[field.name] && errors[field.name]) || props.helperText
        }
        onChange={makeHandleChange(field.name, setFieldValue)}
      />
    )}
  />
);

DateField.propTypes = {
  helperText: PropTypes.string,
  type: PropTypes.string,
};

DateField.defaultProps = {
  type: 'text',
  helperText: '',
};

export default DateField;
