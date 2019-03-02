import React from 'react';

import classes from './Children.scss'

import FieldGeneric from '../FieldGeneric/FieldGeneric'

const Children = (props) => {

    let styles = {
        ...props.styles
    }
    if(!props.blockId){
        styles.backgroundColor ='white'
    }

    return (
        <div className={classes.Children} style={styles} >
            {props.children ? (
                Object.keys(props.children).map(child => (
                    <FieldGeneric key={props.children[child].id} blockId={props.blockId} editorId={props.editorId}  {...props.children[child]} />
                ))
            ) : null}
        </div>
    );
};

export default Children;