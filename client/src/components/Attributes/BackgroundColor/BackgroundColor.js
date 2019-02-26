import React from 'react';

import classes from './BackgroundColor.scss'

const BackgroundColor = (props) => {
    return (
        <div className={classes.BackgroundColor}>
            <p>Background Color: </p>
            <input type="color" value={props.value} onChange={props.changeHandler} />
        </div>
    );
};

export default BackgroundColor;