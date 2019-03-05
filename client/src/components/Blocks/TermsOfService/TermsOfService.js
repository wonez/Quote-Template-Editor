import React from 'react'

import Toolbar from '../../Toolbar/Toolbar'

import classes from './TermsOfService.scss'

const TermsOfService = props => {
    let toolbar = (
        <div>
            <Toolbar selectForEditing={props.selectForEditing} 
                    title={"Terms Of Service"}
                    deleteItemFromEditor={props.deleteItemFromEditor} /> 
        </div>
    )

    return (
        <div className={classes.TermsOfService} >
            {props.connectDragSource ? props.connectDragSource(toolbar) : toolbar}
            <div className={classes.Items}>
                <h1>No saved terms, create new ?</h1> 
            </div>
        </div>
    )
}

export default TermsOfService;