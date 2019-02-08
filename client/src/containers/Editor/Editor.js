import React from 'react'

import TemplateList from '../TemplateList/TemplateList'
import TemplateEditor from '../TemplateEditor/TemplateEditor'
import EditorSidebar from '../EditorSidebar/EditorSidebar'

import classes from './Editor.scss'

class Editor extends React.Component{
    render(){
        return(
            <div className={classes.Editor}>
                <TemplateList />
                <TemplateEditor />
                <EditorSidebar />
            </div>
        )
    }
}

export default Editor;