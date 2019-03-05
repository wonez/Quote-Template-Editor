import React from 'react'

import classes from './Toolbar.scss'

const Toolbar = props => (
    <div className={classes.Toolbar}>
        <div className={classes.Select}></div>
        <p>{props.title}</p>
        <div className={classes.Delete} onClick={props.deleteItemFromEditor}>Delete</div>
    </div>
)

export default Toolbar;