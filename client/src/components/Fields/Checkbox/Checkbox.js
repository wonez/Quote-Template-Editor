import React, { Component } from 'react';

import classes from './Checkbox.scss'

class Checkbox extends Component {

    render() {
        return (
            <div className={classes.Checkbox} style={this.props.id ? null : {backgroundColor: '#eee'}}>
                <input className={classes.Check} value={this.props.checked} onChange={this.props.checkHandler} type="checkbox" /> 
                <input type="text" 
                    className={classes.Label} 
                    value={this.props.preview ? 'Label' : this.props.value} 
                    onChange={this.props.preview ? ()=>{} : this.props.changeHandler}
                    /> 
            </div>
        );
    }
}

export default Checkbox;