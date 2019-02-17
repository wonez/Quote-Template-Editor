import React from 'react'

import Heading from '..//Blocks/Heading/Heading'
import TextInput from '../Fields/TextInput/TextInput';

const BlockDragPreview = React.memo(props => {
    switch(props.type){
        case 'Heading': return <Heading />
        case 'Text Input': return <TextInput />
    }
})

export default BlockDragPreview;