import React from 'react'

import classes from './Heading.scss'

import Toolbar from '../../Toolbar/Toolbar'
import FieldGeneric from '../../FieldGeneric/FieldGeneric'


class Heading extends React.Component {
    render(){
        let toolbar = (
            <div>
                <Toolbar selectForEditing={this.props.selectForEditing} 
                        title={"Heading Block"}
                        deleteItemFromEditor={this.props.deleteItemFromEditor} /> 
            </div>
        )
        return (
            <div className={classes.Heading} >
                {this.props.connectDragSource ? this.props.connectDragSource(toolbar) : toolbar}
                <div className={classes.Items}>
                    {this.props.children ? (
                        Object.keys(this.props.children).map(child => (
                            <FieldGeneric key={this.props.children[child].id} blockId={this.props.id} editorId={this.props.editorId}  {...this.props.children[child]} />
                        ))
                    ) : null}
                </div>
            </div>
        )
    }
}

export default Heading;