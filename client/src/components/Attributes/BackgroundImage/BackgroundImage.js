import React from 'react';

import classes from './BackgroundImage.scss'

const BackgroundImage = (props) => {
    return (
        <div className={classes.BackgroundImage}>
            <p>Background Image: </p>
            <input type="file" onChange={props.changeHandler} />
        </div>
    );
}

export default BackgroundImage;