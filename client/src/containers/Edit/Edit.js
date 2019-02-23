import React from 'react'
import { connect } from 'react-redux'

import TextEditor from '../../components/Editors/TextEditor/TextEditor'

class Edit extends React.Component{
    render(){
        switch(this.props.selectedForEditing.kind){
            case 'Heading':
            case 'Paragraph': 
                return <TextEditor selectedForEditing={this.props.selectedForEditing} />
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