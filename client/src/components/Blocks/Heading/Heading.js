import React from 'react'

import classes from './Heading.scss'

import FieldGeneric from '../../FieldGeneric/FieldGeneric'

class Heading extends React.Component {
    render(){

        let toolbar = (
            <div className={classes.Toolbar}>
                <div className={classes.Select} onClick={this.props.selectForEditing}></div>
                <p>Heading Block</p>
                <div className={classes.Delete} onClick={this.props.deleteItemFromEditor}>Delete</div>
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