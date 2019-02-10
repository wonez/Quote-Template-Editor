import React from 'react'

import { connect } from 'react-redux'
import TemplateEditor from '../TemplateEditor/TemplateEditor';

import classes from './TemplateEditorList.scss'

const TemplateEditorList = props => {
    return(
        <div className={classes.TemplateEditorList}>
            {Object.keys(props.editors).map(editor => (
                <TemplateEditor key={editor} items={props.editors[editor]} id={editor}/>
            ))}
        </div>
    )
}

const mapStateToProps = state => {
    return{
        editors: state.appState.editors
    }
}

export default connect(mapStateToProps)(TemplateEditorList);