import React from 'react'

import Toolbar from '../../Toolbar/Toolbar'

import classes from './CoverPage.scss'

class CoverPage extends React.Component{
    render(){
        let toolbar = (
            <div>
                <Toolbar selectForEditing={this.props.selectForEditing} 
                        title={"Cover Page"}
                        deleteItemFromEditor={this.props.deleteItemFromEditor} /> 
            </div>
        )
            // preappend children bg image, title, subtitle, customer name, user company logo, text area
        return (
            <div className={classes.CoverPage} >
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

export default CoverPage;