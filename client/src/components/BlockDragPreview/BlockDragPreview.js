import React from 'react'

import Heading from '..//Blocks/Heading/Heading'

const BlockDragPreview = React.memo(props => {
    switch(props.type){
        case 'Heading': return <Heading />
    }
})

export default BlockDragPreview;