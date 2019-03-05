import React from 'react'
import { connect } from 'react-redux'

import TextEditor from '../../components/Editors/TextEditor/TextEditor'
import FieldEditor from '../../components/Editors/FieldEditor/FieldEditor'
import ImageEditor from '../../components/Editors/ImageEditor/ImageEditor'
import DropdownEditor from '../../components/Editors/DropdownEditor/DropdownEditor'
import SignatureEditor from '../../components/Editors/SignatureEditor/SignatureEditor'

const Edit = (props) => {
    switch(props.selectedForEditing.kind){
        case 'Heading':
        case 'Paragraph': 
            return <TextEditor selectedForEditing={props.selectedForEditing} />
        case 'Image':
            return <ImageEditor selectedForEditing={props.selectedForEditing} />
        case 'Text Input':
        case 'Date Input':
        case 'Initials Input':
        case 'Checkbox Input':
            return <FieldEditor selectedForEditing={props.selectedForEditing} />
        case 'Dropdown Input':
            return <DropdownEditor selectedForEditing={props.selectedForEditing} />
        case 'Signature Input':
            return <SignatureEditor selectedForEditing={props.selectedForEditing} />
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