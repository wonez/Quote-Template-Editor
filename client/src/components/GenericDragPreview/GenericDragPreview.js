import React from 'react'

import Heading from '../Blocks/Heading/Heading'
import Paragraph from '../Blocks/Paragraph/Paragraph';
import CoverPage from '../Blocks/CoverPage/CoverPage';
import PageBreak from '../Blocks/PageBreak/PageBreak';
import Table from '../Blocks/Table/Table'
import TermsOfService from '../Blocks/TermsOfService/TermsOfService';
import Image from '../Blocks/Image/Image'
import PricingTable from '../Blocks/PricingTable/PricingTable'

import TextInput from '../Fields/TextInput/TextInput';
import DateInput from '../Fields/DateInput/DateInput';
import InitialsInput from '../Fields/InitialsInput/InitialsInput';
import Checkbox from '../Fields/Checkbox/Checkbox';
import DropDownField from '../Fields/DropdownField/DropDownField';
import SignatureInput from '../Fields/SignatureInput/SignatureInput';

const GenericDragPreview = React.memo(props => {
    switch(props.type){
        //blocks
        case 'Heading': return <Heading />
        case 'Paragraph': return <Paragraph />
        case 'Page Break': return <PageBreak />
        case 'Image': return <Image />
        case 'Table': return <Table />
        case 'Cover Page': return <CoverPage />
        case 'Terms Of Service': return <TermsOfService />
        case 'Pricing Table': return <PricingTable />
        //fields
        case 'Text Input': return <TextInput preview />
        case 'Date Input': return <DateInput preview />
        case 'Initials Input': return <InitialsInput preview />
        case 'Checkbox Input': return <Checkbox preview />
        case 'Dropdown Input': return <DropDownField preview />
        case 'Signature Input': return <SignatureInput preview />

        default: null
    }
})

export default GenericDragPreview;