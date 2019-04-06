import React from 'react';
import classes from './TextInput.scss';


const TextInput = (props) => (
    <textarea type="text" className={classes.TextInput} 
        style={props.preview ? { backgroundColor: '#eee', width: 'auto', height: 'auto' } : null}
        value={props.preview ? 'Your Text' : props.value} 
        onChange={props.preview ? () => {} : props.changeHandler } />
)

export default TextInput;