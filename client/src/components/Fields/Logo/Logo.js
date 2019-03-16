import React from 'react';

import classes from './Logo.scss'

const Logo = (props) => {
    return (
        <div className={classes.Logo} style={props.styles} >
            { props.styles.backgroundImage == "url('')" ? <p>Company Logo</p> : null }
        </div>
    );
}

export default Logo;