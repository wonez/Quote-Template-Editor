import React from 'react';

import classes from './DateInput.scss'

const DateInput = (props) => (
    <input type="date" 
        className={classes.DateInput}
        style={props.preview ? {backgroundColor: '#eee'} : null}
        value={props.preview ? '1.1.2019' : props.value} 
        onChange={props.preview ? () => {} : props.changeHandler} />                    
);
export default DateInput;