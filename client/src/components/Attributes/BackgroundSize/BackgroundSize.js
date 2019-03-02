import React, { Component } from 'react';

import classes from './BackgroundSize.scss'

class BackgroundSize extends Component {

    updateX = (e) =>  {
        this.props.changeHandler([
            e.target.value,
            this.props.value[1]
        ])
    }

    updateY = e => {
        this.props.changeHandler([
            this.props.value[0],
            e.target.value
        ])
    }

    render() {
        return (
            <div className={classes.BackgroundSize}>
                <p>Background Size</p>
                <div className={classes.Values}>
                    <div>
                        <p>Width: </p>
                        <input type="number" value={this.props.value[0]} onChange={this.updateX} />  
                    </div>
                    <div>
                        <p>Height: </p>
                        <input type="number" value={this.props.value[1]} onChange={this.updateY} />  
                    </div>
                </div>
            </div>
        );
    }
}

export default BackgroundSize;