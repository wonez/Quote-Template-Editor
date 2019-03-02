import React from 'react';

import classes from './DropDownField.scss'

const DropDownField = (props) => {
    return (
        <select style={!props.id ? {background: 'whitesmoke'} : null} value={props.value} onChange={props.changeHandler}>
            {props.options ? Object.keys(props.options).map(option => {
                return <option key={option} value={option}>{props.options[option]}</option>
            }) : 
                <option>Select a field</option>
            }
        </select>
    );
};

export default DropDownField;