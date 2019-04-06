import React from 'react';
import { connect } from 'react-redux'

import classes from './Status.scss'

const Status = (props) => {
    if(!props.saved) return null;
    return (
        <div className={classes.Status}>
            Auto Save on {props.saved.toString()}
        </div>
    );
};

export default connect(state => {
    return{
        saved: state.gui.saved
    }
})(Status);