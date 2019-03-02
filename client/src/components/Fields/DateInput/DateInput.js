import React, { Component } from 'react';

import classes from './DateInput.scss'

class DateInput extends Component {
    render() {
        return (
            <input type="date" 
                className={classes.DateInput}
                style={this.props.id ? null : {backgroundColor: '#eee'}}
                value={this.props.preview ? '1.1.2019' : this.props.value} 
                onChange={this.props.preview ? () => {} : this.props.changeHandler} />                    
        );
    }
}

export default DateInput;