import React from 'react'
import BlockSelector from '../BlockSelector/BlockSelector';

import classes from './AllBlocks.scss'

const AllBlocks = (props) => {
    return(
        <div className={classes.AllBlocks}>
            <BlockSelector kind="Heading" />
            <BlockSelector kind="Cover Page" />
            <BlockSelector kind="Image" />
            <BlockSelector kind="Page Break" />
            <BlockSelector kind="Pricing Table" />
            <BlockSelector kind="Paragraph" />
            <BlockSelector kind="Table" />
            <BlockSelector kind="Terms Of Service" />
        </div>
    )
}

export default AllBlocks;