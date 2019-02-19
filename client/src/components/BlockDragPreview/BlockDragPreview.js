import React from 'react'

import Heading from '..//Blocks/Heading/Heading'
import TextInput from '../Fields/TextInput/TextInput';
import Paragraph from '../Blocks/Paragraph/Paragraph';
import CoverPage from '../Blocks/CoverPage/CoverPage';
import PageBreak from '../Blocks/PageBreak/PageBreak';
import TermsOfService from '../Blocks/TermsOfService/TermsOfService';
import Image from '../Blocks/Image/Image'

const BlockDragPreview = React.memo(props => {
    switch(props.type){
        //blocks
        case 'Heading': return <Heading />
        case 'Cover Page': return <CoverPage />
        case 'Paragraph': return <Paragraph />
        case 'Page Break': return <PageBreak />
        case 'Terms Of Service': return <TermsOfService />
        case 'Image': return <Image />
        //fields
        case 'Text Input': return <TextInput />
    }
})

export default BlockDragPreview;