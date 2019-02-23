import React from 'react'

import classes from './FontSize.scss'

const FontSize = props => {
    return(
        <div className={classes.FontSize}>
            <p>Font Size: </p>
            <input className={classes.Input} 
                    value={props.value} 
                    onChange={props.changeHandler} 
                    min="1" 
                    type="number" />
            <p>&nbsp; px</p>
        </div>
    ) 
}

export default FontSize;