import React from 'react'

import classes from './TextInput.scss'

class TextInput extends React.Component{
    render(){
        return(
            <div className={classes.TextInput}>
                <textarea type="text" className={classes.Input} 
                    value={this.props.value} 
                    onChange={this.props.changeHandler} />
            </div>
        )
    }
}

export default TextInput;