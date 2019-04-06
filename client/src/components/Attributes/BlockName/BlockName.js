import React from 'react';

import classes from './BlockName.scss'

const BlockName = (props) => {
    return (
        <div className={classes.BlockName}>
            <p>Block Name: </p>
            <input className={classes.Input} 
                    value={props.value} 
                    onChange={props.changeHandler} 
                    type="text" />
        </div>
    );
};

export default BlockName;