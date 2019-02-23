import React from 'react'

import classes from './FontFamily.scss'

const FontFamily = props => {
    return(
        <div className={classes.FontFamily}>
            <p>Font Family: </p>
            <select value={props.value} onChange={props.changeHandler}>
                <option value="Arial">Arial</option>
                <option value="Calibri">Calibri</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Monaco">Monaco</option>
                <option value="Sans Serif">Sans Serif</option>
                <option value="Tahoma">Tahoma</option>
                <option value="Times New Roman">Times New Roman</option>
            </select>
        </div>
    )
}

export default FontFamily;