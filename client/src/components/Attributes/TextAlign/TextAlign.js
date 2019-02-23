import React from 'react'

import classes from './TextAlign.scss'

const TextAlign = props => {
    return(
        <div className={classes.TextAlign}>
            <p>Align: </p>
            <div className={classes.Alignments}>
                <button data-val="free"  className={props.value == 'free' ? classes.Active : null} onClick={props.changeHandler}>Free</button>
                <div className={classes.Alignments}>
                    <button data-val="left" className={props.value == 'left' ? classes.Active : null} onClick={props.changeHandler} >Left</button>
                    <button data-val="center" className={props.value == 'center' ? classes.Active : null} onClick={props.changeHandler} >Center</button>
                    <button data-val="right" className={props.value == 'right' ? classes.Active : null} onClick={props.changeHandler} >Right</button>
                </div>
            </div>
        </div>
    )
}

export default TextAlign;