import React from 'react';

import classes from './Checkbox.scss'

const Checkbox = (props) => (
    <div className={classes.Checkbox} style={props.preview ? {backgroundColor: '#eee'} : null}>
        <input className={classes.Check} checked={props.checked} onChange={props.checkHandler} type="checkbox" /> 
        <input type="text" 
            className={classes.Label} 
            value={props.preview ? 'Label' : props.value} 
            onChange={props.preview ? ()=>{} : props.changeHandler}
            /> 
    </div>
);


export default Checkbox;