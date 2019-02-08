import React from 'react';
import PropTypes from 'prop-types';
import { FastField } from 'formik';
import { zonedTimeToUtc } from 'date-fns-tz';
import { TimePicker } from 'material-ui-pickers';
import CalendarToday from '@material-ui/icons/CalendarToday';

const makeHandleChange = (name, setFieldValue) => value => {
  setFieldValue(name, zonedTimeToUtc(value, 'America/Denver'));
};

const TimeField = props => (
  <FastField
    {...props}
    render={({
      field,
      form: { touched, errors, setFieldValue },
      disabled = false,
    }) => (
      <TimePicker
        {...props}
        {...field}
        keyboard
        mask={[/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
        error={touched[field.name] && !!errors[field.name]}
        helperText={
          touched[field.name] && errors[field.name]
            ? errors[field.name]
            : props.helperText
        }
        disabled={disabled}
        value={field.value || ''}
        onChange={makeHandleChange(field.name, setFieldValue)}
        keyboardIcon={<CalendarToday />}
      />
    )}
  />
);

TimeField.propTypes = {
  helperText: PropTypes.string,
  type: PropTypes.string,
};

TimeField.defaultProps = {
  type: 'text',
  helperText: '',
};

export default TimeField;
