import React from 'react';
import { FastField } from 'formik';
import { DatePicker } from 'material-ui-pickers';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';

const makeHandleChange = (name, setFieldValue) => value => {
  setFieldValue(name, value);
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
        helperText={errors[field.name] || props.helperText}
        onChange={makeHandleChange(field.name, setFieldValue)}
      />
    )}
  />
);

DateField.defaultProps = {
  type: 'text',
};

export default DateField;
