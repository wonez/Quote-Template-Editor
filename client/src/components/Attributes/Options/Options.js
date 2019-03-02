import React from 'react';

import classes from './Options.scss'

const Options = (props) => {
    return (
        <div className={classes.Options}>
            {Object.keys(props.options).map(option => {
                return (
                    <div key={option} className={classes.Option}>
                        <input type="text" value={props.options[option]} onChange={(e) => props.changeHandler(option, e.target.value)} />
                        <span onClick={() => props.deleteOptions(option)}>X</span>   
                    </div>
                )
            })}
            <button onClick={props.addNewOptions} >Add new +</button>
        </div>
    );
};

export default Options;