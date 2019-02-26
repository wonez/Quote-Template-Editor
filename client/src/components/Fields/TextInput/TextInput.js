import React from 'react'

import classes from './TextInput.scss'

class TextInput extends React.Component{
    render(){
        return(
            <div className={classes.TextInput} style={this.props.id ? null : {backgroundColor: '#eee'}}>
                <textarea type="text" className={classes.Input} 
                    value={this.props.value ? this.props.value : 'Your Text'} 
                    onChange={this.props.changeHandler ? this.props.changeHandler : () => {}} />
            </div>
        )
    }
}

export default TextInput;