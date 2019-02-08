import React from 'react'
import BlockSelector from '../BlockSelector/BlockSelector';

import classes from './AllBlocks.scss'

const AllBlocks = (props) => {
    return(
        <div className={classes.AllBlocks}>
            <BlockSelector kind="Heading" />
            <BlockSelector kind="Paragraph" />
        </div>
    )
}

export default AllBlocks;