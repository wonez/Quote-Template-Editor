import React from 'react'

import Heading from '../Blocks/Heading/Heading'
import TextInput from '../Fields/TextInput/TextInput';
import Paragraph from '../Blocks/Paragraph/Paragraph';
import CoverPage from '../Blocks/CoverPage/CoverPage';
import PageBreak from '../Blocks/PageBreak/PageBreak';
import TermsOfService from '../Blocks/TermsOfService/TermsOfService';
import Image from '../Blocks/Image/Image'
import DateInput from '../Fields/DateInput/DateInput';
import InitialsInput from '../Fields/InitialsInput/InitialsInput';
import Checkbox from '../Fields/Checkbox/Checkbox';
import DropDownField from '../Fields/DropdownField/DropDownField';
import SignatureInput from '../Fields/SignatureInput/SignatureInput';

const GenericDragPreview = React.memo(props => {
    switch(props.type){
        //blocks
        case 'Heading': return <Heading />
        case 'Cover Page': return <CoverPage />
        case 'Paragraph': return <Paragraph />
        case 'Page Break': return <PageBreak />
        case 'Terms Of Service': return <TermsOfService />
        case 'Image': return <Image />
        //fields
        case 'Text Input': return <TextInput preview />
        case 'Date Input': return <DateInput preview />
        case 'Initials Input': return <InitialsInput preview />
        case 'Checkbox Input': return <Checkbox preview />
        case 'Dropdown Input': return <DropDownField preview />
        case 'Signature Input': return <SignatureInput preview />
    }
})

export default GenericDragPreview;