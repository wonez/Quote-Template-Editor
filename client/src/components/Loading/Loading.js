import React from 'react';
import { connect } from 'react-redux'

import classes from './Loading.scss'

const Loading = (props) => {
    if(!props.loading) return null;

    return (
        <div className={classes.Background}>
            <div className={classes.Spinner}></div>        
        </div>
    );
};

export default connect(state => ({
    loading: state.gui.loading
}))(Loading);