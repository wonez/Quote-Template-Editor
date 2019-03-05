import React from 'react';

import classes from './DropDownField.scss'

const DropDownField = (props) => {
    let holder = (
        <div className={classes.Holder}>...</div>
    )
    return (
        <div className={classes.DropDownField}>
            <select style={props.preview ? {background: 'whitesmoke'} : null} value={props.value} onChange={props.changeHandler}>
                {props.options ? Object.keys(props.options).map(option => {
                    return <option key={option} value={option}>{props.options[option]}</option>
                }) : 
                    <option>Select a field</option>
                }
            </select>
            {props.connectDragSource ? props.connectDragSource(holder) : holder}
        </div>
    );
};

export default DropDownField;