import React from 'react'

import Toolbar from '../../Toolbar/Toolbar'

import classes from './TermsOfService.scss'

class TermsOfService extends React.Component{
    render(){
        let toolbar = (
            <div>
                <Toolbar selectForEditing={this.props.selectForEditing} 
                        title={"Terms Of Service"}
                        deleteItemFromEditor={this.props.deleteItemFromEditor} /> 
            </div>
        )

        return (
            <div className={classes.TermsOfService} >
                {this.props.connectDragSource ? this.props.connectDragSource(toolbar) : toolbar}
                <div className={classes.Items}>
                    <h1>No saved terms, create new ?</h1> 
                </div>
            </div>
        )
    }
}

export default TermsOfService;