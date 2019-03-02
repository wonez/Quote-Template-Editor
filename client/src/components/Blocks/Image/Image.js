import React from 'react'

import Toolbar from '../../Toolbar/Toolbar'
import Children from '../../Children/Children'

import classes from './Image.scss'

class Image extends React.Component{
    render(){
        let toolbar = (
            <div>
                <Toolbar selectForEditing={this.props.selectForEditing} 
                        title={"Image Block"}
                        deleteItemFromEditor={this.props.deleteItemFromEditor} /> 
            </div>
        )
        return (
            <div className={classes.Image} >
                {this.props.connectDragSource ? this.props.connectDragSource(toolbar) : toolbar}
                <Children styles={this.props.styles} children={this.props.children} blockId={this.props.id} editorId={this.props.editorId} />
            </div>
        )
    }  
}

export default Image;