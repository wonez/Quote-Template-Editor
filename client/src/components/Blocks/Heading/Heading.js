import React from 'react'

import classes from './Heading.scss'

const Heading = props => {
    return(
        // <div className={classes.Heading} style={{left: props.x, top: props.y}}>
        <div className={classes.Heading} style={{top: props.y}}>
            <div className={classes.Toolbar}>
                <div className={classes.Select} onClick={props.selectForEditing}></div>
                <p>Heading Block</p>
                <div className={classes.Delete} onClick={props.deleteItemFromEditor}>Delete</div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Heading;