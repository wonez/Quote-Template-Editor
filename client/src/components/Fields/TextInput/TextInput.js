import React from 'react'

import classes from './TextInput.scss'

class TextInput extends React.Component{
    render(){
        return(
            <textarea type="text" className={classes.TextInput} 
                style={this.props.id ? null : {backgroundColor: '#eee'}}
                value={this.props.preview ? 'Your Text' : this.props.value} 
                onChange={this.props.preview ? () => {} : this.props.changeHandler } />
        )
    }
}

export default TextInput;