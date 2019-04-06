import React from 'react'

import Toolbar from '../../Toolbar/Toolbar'

import classes from './TermsOfService.scss'

const TermsOfService = props => {
    let toolbar = (
        <div>
            <Toolbar selectForEditing={props.selectForEditing} 
                    title={props.blockName ? props.blockName : "Terms Of Service"}
                    deleteItemFromEditor={props.deleteItemFromEditor} /> 
        </div>
    )
    return (
        <div className={classes.TermsOfService} >
            {props.connectDragSource ? props.connectDragSource(toolbar) : toolbar}
            <div className={classes.Items}>
                {props.text}
            </div>
        </div>
    )
}

export default TermsOfService;