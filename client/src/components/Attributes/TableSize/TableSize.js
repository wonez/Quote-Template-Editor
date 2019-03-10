import React from 'react';

import classes from './TableSize.scss'

const TableSize = (props) => (
    <div className={classes.TableSize}>
        <p>{props.title}</p>
        <div>
            <button onClick={() => props.changeHandler(-1)}>-</button>
            <p>{Object.keys(props.table[Object.keys(props.table)[0]].cells).length}</p>
            <button onClick={() => props.changeHandler(1)}>+</button>
        </div>
    </div>
);

export default TableSize;