import React from 'react';

import classes from './InitialsInput.scss'

const InitialsInput = (props) => {

    const changeHandler = e => {
        if(e.target.value.length <= 5){
            props.changeHandler(e);   
        }
    }

    return (
        <textarea type="text" className={classes.InitialsInput} 
            style={props.preview ? {backgroundColor: '#eee'} : null}
            value={props.preview ? 'TEXT' : props.value} 
            onChange={props.preview ? () => {} : changeHandler} />
    );
}

export default InitialsInput;