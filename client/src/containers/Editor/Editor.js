import React from 'react'

import TemplateList from '../TemplateList/TemplateList'
import EditorSidebar from '../EditorSidebar/EditorSidebar'

import classes from './Editor.scss'
import TemplateEditorList from '../TemplateEditorList/TemplateEditorList';

class Editor extends React.Component{
    render(){
        return(
            <div className={classes.Editor}>
                <TemplateList />
                <TemplateEditorList />
                <EditorSidebar />
            </div>
        )
    }
}

export default Editor;