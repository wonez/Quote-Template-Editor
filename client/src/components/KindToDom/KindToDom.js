import React from 'react'

import Heading from '../Blocks/Heading/Heading'
import TextInput from '../Fields/TextInput/TextInput';
import Paragraph from '../Blocks/Paragraph/Paragraph';
import CoverPage from '../Blocks/CoverPage/CoverPage';
import TermsOfService from '../Blocks/TermsOfService/TermsOfService';
import Image from '../Blocks/Image/Image'

const KindToDom = props => {
    switch(props.kind){
        //blocks
        case 'Heading': return <Heading  {...props}/>
        case 'Cover Page': return <CoverPage  {...props} />
        case 'Paragraph': return <Paragraph {...props} />
        case 'Terms Of Service': return <TermsOfService {...props} />
        case 'Image': return <Image {...props} />
        //fields
        case 'Text Input': return <TextInput  {...props} />

        default: return null
    }
}

export default KindToDom;