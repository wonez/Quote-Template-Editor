import React from 'react'
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux'

import TextEditor from '../../components/Editors/TextEditor/TextEditor'
import FieldEditor from '../../components/Editors/FieldEditor/FieldEditor'
import ImageEditor from '../../components/Editors/ImageEditor/ImageEditor'
import DropdownEditor from '../../components/Editors/DropdownEditor/DropdownEditor'
import SignatureEditor from '../../components/Editors/SignatureEditor/SignatureEditor'
import TableEditor from '../../components/Editors/TableEditor/TableEditor'
import PricingTableEditor from '../../components/Editors/PricingTableEditor/PricingTableEditor'
import TermsOfServiceEditor from '../../components/Editors/TermsOfServiceEditor/TermsOfServiceEditor'

const Edit = (props) => {
    switch(props.selectedForEditing.kind){
        case 'Heading':
        case 'Paragraph': 
            return <TextEditor selectedForEditing={props.selectedForEditing} />
        case 'Terms Of Service':
            return (
                <Aux>
                    <TextEditor selectedForEditing={props.selectedForEditing} />
                    <TermsOfServiceEditor selectedForEditing={props.selectedForEditing} />
                </Aux>
            )
        case 'Cover Page':
            return (
                <Aux>
                    <TextEditor selectedForEditing={props.selectedForEditing} />
                    <ImageEditor selectedForEditing={props.selectedForEditing} />
                </Aux>
            )
        case 'Image':
            return <ImageEditor selectedForEditing={props.selectedForEditing} name />
        case 'Table':
            return <TableEditor selectedForEditing={props.selectedForEditing} />
        case 'Pricing Table':
            return <PricingTableEditor selectedForEditing={props.selectedForEditing} />
        
        case 'Text Input':
        case 'Date Input':
        case 'Initials Input':
        case 'Checkbox Input':
            return <FieldEditor selectedForEditing={props.selectedForEditing} />
        case 'Dropdown Input':
            return <DropdownEditor selectedForEditing={props.selectedForEditing} />
        case 'Signature Input':
            return <SignatureEditor selectedForEditing={props.selectedForEditing} />
        case 'Logo':
            return <ImageEditor selectedForEditing={props.selectedForEditing} />
        default: 
            return null
    }
}

const mapStateToProps = state => {
    return{
        selectedForEditing: state.appState.selectedForEditing,
    }
}

export default connect(mapStateToProps)(Edit);