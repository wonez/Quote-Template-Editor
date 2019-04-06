import React from 'react';

import classes from './CreateTemplateModal.scss'

import Modal from '../Modal'

const CreateTemplateModal = props => {
    return (
        <Modal>
            <h1 className={classes.Heading}>Create New Template</h1>
            <div className={classes.Form}>
                <p>Template Name: </p>
                <input type="text" placeholder="Template Name"/>
            </div>
            <div className={classes.Form}>
                {props.hideCancel ? null : <a className={classes.Cancel} >Cancel</a>}
                <a className={classes.Submit} >Submit</a>
            </div>
        </Modal>
    );
};



export default CreateTemplateModal;