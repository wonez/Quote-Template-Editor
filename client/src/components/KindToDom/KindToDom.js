import React from 'react'

import Heading from '../Blocks/Heading/Heading'
import Paragraph from '../Blocks/Paragraph/Paragraph';
import CoverPage from '../Blocks/CoverPage/CoverPage';
import TermsOfService from '../Blocks/TermsOfService/TermsOfService';
import Image from '../Blocks/Image/Image'

import TextInput from '../Fields/TextInput/TextInput';
import DateInput from '../Fields/DateInput/DateInput'
import InitialsInput from '../Fields/InitialsInput/InitialsInput';
import Checkbox from '../Fields/Checkbox/Checkbox';
import DropDownField from '../Fields/DropdownField/DropDownField';
import SignatureInput from '../Fields/SignatureInput/SignatureInput';

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
        case 'Date Input': return <DateInput {...props} />
        case 'Initials Input': return <InitialsInput {...props} />
        case 'Checkbox Input': return <Checkbox {...props} />
        case 'Dropdown Input': return <DropDownField {...props} />
        case 'Signature Input': return <SignatureInput {...props} />

        default: return null
    }
}

export default KindToDom;