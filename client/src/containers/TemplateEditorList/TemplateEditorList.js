import React from 'react'

import { connect } from 'react-redux'
import TemplateEditor from '../TemplateEditor/TemplateEditor';

import classes from './TemplateEditorList.scss'
import EditorNotSelected from '../EditorNotSelected/EditorNotSelected';

const TemplateEditorList = props => {
    return(
        <div className={classes.TemplateEditorList}>
            {props.editors ? 
                Object.keys(props.editors).map(editor => (<TemplateEditor key={editor} items={props.editors[editor]} id={editor}/>)) 
                :
                <EditorNotSelected />
            }
        </div>
    )
}

const mapStateToProps = state => {
    return{
        editors: state.appState.editors
    }
}

export default connect(mapStateToProps)(TemplateEditorList);