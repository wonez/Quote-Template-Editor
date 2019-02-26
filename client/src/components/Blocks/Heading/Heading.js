import React from 'react'

import classes from './Heading.scss'

import Toolbar from '../../Toolbar/Toolbar'
import Children from '../../Children/Children'

const Heading = props => {
    let toolbar = (
        <div>
            <Toolbar selectForEditing={props.selectForEditing} 
                    title={"Heading Block"}
                    deleteItemFromEditor={props.deleteItemFromEditor} /> 
        </div>
    )
    return (
        <div className={classes.Heading} >
            {props.connectDragSource ? props.connectDragSource(toolbar) : toolbar}
            <Children children={props.children} blockId={props.id} editorId={props.editorId} />
        </div>
    )
}

export default Heading;