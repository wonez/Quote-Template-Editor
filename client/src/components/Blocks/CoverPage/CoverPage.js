import React from 'react'

import Toolbar from '../../Toolbar/Toolbar'
import Children from '../../Children/Children'

import classes from './CoverPage.scss'

const CoverPage = props => {
    let toolbar = (
        <div>
            <Toolbar selectForEditing={props.selectForEditing} 
                    title={props.blockName ? props.blockName : "Cover Page Block"}
                    deleteItemFromEditor={props.deleteItemFromEditor} /> 
        </div>
    )
    return (
        <div className={classes.CoverPage} >
            {props.connectDragSource ? props.connectDragSource(toolbar) : toolbar}
            <Children styles={props.styles } children={props.children} blockId={props.id} editorId={props.editorId} />
        </div>
    )
}

export default CoverPage;