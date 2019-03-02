import React, { Component } from 'react';

import classes from './InitialsInput.scss'

class InitialsInput extends Component {

    changeHandler = e => {
        if(e.target.value.length <= 5){
            this.props.changeHandler(e);   
        }
    }

    render() {
        return (
            <textarea type="text" className={classes.InitialsInput} 
                style={this.props.id ? null : {backgroundColor: '#eee'}}
                value={this.props.preview ? 'TEXT' : this.props.value} 
                onChange={this.props.preview ? () => {} : this.changeHandler} />
        );
    }
}

export default InitialsInput;