import React from 'react'

import classes from './Paragraph.scss'

import Toolbar from '../../Toolbar/Toolbar'
import Children from '../../Children/Children'

const Paragraph = props => {
    let toolbar = (
        <div>
            <Toolbar selectForEditing={props.selectForEditing} 
                    title={"Paragraph Block"}
                    deleteItemFromEditor={props.deleteItemFromEditor} /> 
        </div>
    )

    return (
        <div className={classes.Paragraph} >
            {props.connectDragSource ? props.connectDragSource(toolbar) : toolbar}
            <Children children={props.children} blockId={props.id} editorId={props.editorId} />
        </div>
    )
}

export default Paragraph;