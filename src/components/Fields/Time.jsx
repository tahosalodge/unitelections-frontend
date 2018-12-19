import React from 'react';
import { FastField } from 'formik';
import { TimePicker } from 'material-ui-pickers';
import CalendarToday from '@material-ui/icons/CalendarToday';

const makeHandleChange = (name, setFieldValue) => value => {
  setFieldValue(name, value);
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
        helperText={errors[field.name] ? errors[field.name] : props.helperText}
        disabled={disabled}
        value={field.value || ''}
        onChange={makeHandleChange(field.name, setFieldValue)}
        keyboardIcon={<CalendarToday />}
      />
    )}
  />
);

TimeField.defaultProps = {
  type: 'text',
};

export default TimeField;
