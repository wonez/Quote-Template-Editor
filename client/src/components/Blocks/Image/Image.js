import React from 'react'

import Toolbar from '../../Toolbar/Toolbar'
import Children from '../../Children/Children'

import classes from './Image.scss'

const Image = (props) => {
    let toolbar = (
        <div>
            <Toolbar title={props.blockName ? props.blockName : "Image Block"}
                        deleteItemFromEditor={props.deleteItemFromEditor} /> 
        </div>
    )
    return (
        <div className={classes.Image} >
            {props.connectDragSource ? props.connectDragSource(toolbar) : toolbar}
            <Children styles={props.styles} children={props.children} blockId={props.id} editorId={props.editorId} />
        </div>
    )
}

export default Image;