import React from 'react'

import classes from './Color.scss'

const Color = props => {
    return(
        <div className={classes.Color}>
            <p>Color: </p>
            <input type="color" value={props.value} onChange={props.changeHandler} />
        </div>
    )
}

export default Color;