import React, { Component } from 'react';

import classes from './EditorNotSelected.scss'

class EditorNotSelected extends Component {
    render() {
        return (
            <div className={classes.EditorNotSelected}>
                <p>Select a Template or create new One</p>
            </div>
        );
    }
}

export default EditorNotSelected;