import React from 'react'

import Heading from '../Blocks/Heading/Heading'
import TextInput from '../Fields/TextInput/TextInput';

const TypeToDom = props => {
    switch(props.type){
        case 'Heading': return <Heading  {...props}/>
        case 'Text Input': return <TextInput  {...props} />
    }
}

export default TypeToDom;