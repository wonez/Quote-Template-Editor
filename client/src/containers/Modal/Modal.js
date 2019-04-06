import React from 'react';

import classes from './Modal.scss'

const Modal = (props) => {
    return (
        <div className={classes.Modal}>
            <div className={classes.Content}>
                {props.children}
            </div>
        </div>
    );
}


export default Modal;