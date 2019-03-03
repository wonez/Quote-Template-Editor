import React from 'react';

const LineWidth = (props) => {
    return (
        <div>
            <p>Line Width: </p>
            <input type="range" min="1" max="30" onChange={props.changeHandler} value={props.value}></input>
        </div>
    );
};

export default LineWidth;