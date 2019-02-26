import React from 'react'
import { connect } from 'react-redux'

import TextEditor from '../../components/Editors/TextEditor/TextEditor'
import FieldEditor from '../../components/Editors/FieldEditor/FieldEditor'

class Edit extends React.Component{
    render(){
        switch(this.props.selectedForEditing.kind){
            case 'Heading':
            case 'Paragraph': 
                return <TextEditor selectedForEditing={this.props.selectedForEditing} />
            case 'Text Input':
                return <FieldEditor selectedForEditing={this.props.selectedForEditing} />
            default: 
                return null
        }
    }
}

const mapStateToProps = state => {
    return{
        selectedForEditing: state.appState.selectedForEditing,
    }
}

export default connect(mapStateToProps)(Edit);